import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PomodoroState, PomodoroRuntime, PomodoroType, PomodoroPresetId } from "@/lib/types/pomodoro";
import { INITIAL_POMODORO_STATE } from "@/lib/constants";
import { ask } from "@tauri-apps/plugin-dialog";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';
import { POMODORO_PRESETS } from "@/lib/constants/maps";

interface PomodoroContextValues {
     state: PomodoroState
     runtime: PomodoroRuntime
     t: TFunction<"pomodoro">
     selectedPreset: PomodoroPresetId | null,
     setSelectedPreset: (preset: PomodoroPresetId | null) => void,

     start: () => void
     pause: () => void
     resume: () => void
     stop: () => Promise<void>
     apply: (values?: PomodoroType) => void
}

const PomodoroContext = createContext<PomodoroContextValues | null>(null);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
     const {t} = useTranslation("pomodoro")
     const {t: mainTxt} = useTranslation()
     const prevPhaseRef = useRef<PomodoroRuntime["phase"]>("idle");
     const [selectedPreset, setSelectedPreset] = useState<PomodoroPresetId | null>("balanced")
     const [permissionGranted, setPermissionGranted] = useState(false)
     const [state, setStateRaw] = useState<PomodoroState>(INITIAL_POMODORO_STATE);
     const setState = (overrides: Partial<PomodoroState>) => setStateRaw(prev=>({...prev, ...overrides}));
     const [runtime, setRuntime] = useState<PomodoroRuntime>({
          phase: "idle",
          remaining: 1800,
          total: 1800,
          loopIndex: 1,
          isPaused: false,
          initialized: false,
     });
     const updateRuntime = (overrides: Partial<PomodoroRuntime>) => setRuntime(prev=>({...prev, ...overrides}))
     const audioRef = useRef<HTMLAudioElement | null>(null);
     const apply = (valuesRaw?: PomodoroType) => {
          const values = valuesRaw || POMODORO_PRESETS[selectedPreset ?? "balanced"]
          const matchPreset = Object.entries(POMODORO_PRESETS).find(
               ([, val]) =>
               val.focus === values.focus &&
               val.shortBreak === values.shortBreak &&
               val.longBreak === values.longBreak &&
               val.loops === values.loops
          )
          setSelectedPreset(matchPreset?.[0] as PomodoroPresetId ?? null)
          setState({
               focus: values.focus,
               shortBreak: values.shortBreak,
               longBreak: values.longBreak,
               loops: values.loops,
          });
          const focusSec = values.focus * 60;
          updateRuntime({
               remaining: focusSec,
               total: focusSec,
          });
     }
     const start = () => {
          setState({
               isStarted: true,
          });
          updateRuntime({
               phase: "focus",
               loopIndex: 1,
               isPaused: false,
               initialized: false,
          });
     };
     const pause = () => updateRuntime({ isPaused: true });
     const resume = () => updateRuntime({ isPaused: false });
     const stop = async () => {
          const confirmed = await ask(t("confirmation"),{
               title: mainTxt("appName")
          });
          if (!confirmed) return;
          setRuntime({
               phase: "idle",
               remaining: 1800,
               total: 1800,
               loopIndex: 1,
               isPaused: false,
               initialized: false,
          });
          setState(INITIAL_POMODORO_STATE);
     };
     const advance = (prev: PomodoroRuntime): PomodoroRuntime => {
          if (prev.phase === "focus") {
               const isLong = prev.loopIndex % state.loops === 0;
               const nextTime = (isLong ? state.longBreak : state.shortBreak) * 60;
               return {
                    phase: isLong ? "long-break" : "short-break",
                    remaining: nextTime,
                    total: nextTime,
                    loopIndex: prev.loopIndex,
                    isPaused: false,
                    initialized: prev.initialized,
               };
          }
          return {
               phase: "focus",
               remaining: state.focus * 60,
               total: state.focus * 60,
               loopIndex: prev.loopIndex + 1,
               isPaused: false,
               initialized: prev.initialized,
          };
     };

     const notify = async(message: string) => {
          if (!permissionGranted) {
               const permission = await requestPermission();
               setPermissionGranted(permission === "granted");
          }
          sendNotification({
               title: mainTxt("appName"),
               body: message
          })
     }

     const text = useMemo(()=>{
          if (runtime.phase === "focus") {
               return t("notifications.focus");
          } else {
               return t("notifications.break");
          }
     },[t])

     useEffect(() => {
          if (runtime.phase === "idle") return;
          if (prevPhaseRef.current !== runtime.phase) {
               notify(text)
          }
          prevPhaseRef.current = runtime.phase;
     }, [runtime.phase, text]);

     useEffect(()=>{
          const setupPerms = async() => {
               const granted = await isPermissionGranted();
               if (granted) {
                    setPermissionGranted(true);
               } else {
                    const permission = await requestPermission();
                    setPermissionGranted(permission === 'granted');
               }
          }
          setupPerms()
     },[])

     useEffect(() => {
          if (!state.isStarted) return;
          audioRef.current = new Audio();
     }, [state.isStarted]);

     useEffect(() => {
          if (!audioRef.current || runtime.phase === "idle") return;
          if (!runtime.initialized) {
               updateRuntime({ initialized: true });
               return;
          }
          audioRef.current.src = `/sounds/pomodoro-${runtime.phase === "focus" ? "focus" : "break"}.mp3`;
          audioRef.current.play().catch(() => {});
     }, [runtime.phase]);

     useEffect(() => {
          if (runtime.phase === "idle" || runtime.isPaused) return;
          const tick = setInterval(() => {
               setRuntime(prev => {
                    if (prev.remaining > 1) {
                         return { ...prev, remaining: prev.remaining - 1 };
                    }
                    return advance(prev);
               });
          }, 1000);
          return () => clearInterval(tick);
     }, [runtime, state]);

     const value = useMemo(() => ({
          state,
          runtime,
          selectedPreset,
          setSelectedPreset,
          start,
          pause,
          resume,
          stop,
          apply,
          t
     }), [state, runtime, selectedPreset]);

     return (
          <PomodoroContext.Provider value={value}>
               {children}
          </PomodoroContext.Provider>
     );
}

export function usePomodoro() {
     const ctx = useContext(PomodoroContext);
     if (!ctx) throw new Error("usePomodoro must be used within provider");
     return ctx;
}