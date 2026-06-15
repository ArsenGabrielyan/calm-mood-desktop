import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PomodoroState, PomodoroRuntime, PomodoroType } from "@/lib/types/pomodoro";
import { INITIAL_POMODORO_STATE } from "@/lib/constants";
import { ask } from "@tauri-apps/plugin-dialog";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification';

interface PomodoroContextValues {
     state: PomodoroState
     runtime: PomodoroRuntime
     t: TFunction<"pomodoro">

     start: (values?: PomodoroType) => void
     pause: () => void
     resume: () => void
     stop: () => Promise<void>
}

const PomodoroContext = createContext<PomodoroContextValues | null>(null);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
     const {t} = useTranslation("pomodoro")
     const {t: mainTxt} = useTranslation()
     const prevPhaseRef = useRef<PomodoroRuntime["phase"]>("idle");

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
     const audioRef = useRef<HTMLAudioElement | null>(null);
     const start = (valuesRaw?: PomodoroType) => {
          const values = valuesRaw || {
               focus: "30",
               shortBreak: "15",
               longBreak: "25",
               loops: "8"
          }
          const focus = parseInt(values.focus);
          setState({
               focus,
               shortBreak: parseInt(values.shortBreak),
               longBreak: parseInt(values.longBreak),
               loops: parseInt(values.loops),
               isStarted: true,
          });
          const focusSec = focus * 60;
          setRuntime({
               phase: "focus",
               remaining: focusSec,
               total: focusSec,
               loopIndex: 1,
               isPaused: false,
               initialized: false,
          });
     };
     const pause = () => setRuntime(prev => ({ ...prev, isPaused: true }));
     const resume = () => setRuntime(prev => ({ ...prev, isPaused: false }));
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
               setRuntime(prev => ({ ...prev, initialized: true }));
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
          start,
          pause,
          resume,
          stop,
          t
     }), [state, runtime]);

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