import { EXERCISE_INTERVAL_TIME } from "@/lib/constants";
import { BREATHING_PATTERNS, PHASE_TO_CIRCLE } from "@/lib/constants/maps";
import { BreathingExerciseState, BreathingPhase, BreathingPatternId, CirclePhase } from "@/lib/types/breathing-exercise";
import { preloadAudio } from "@/lib/utils";
import { createContext, useContext, useState, useRef, useMemo, useEffect } from "react";
interface BreathingExerciseContextValues {
     state: BreathingExerciseState
     setState: (updates: Partial<BreathingExerciseState>) => void
     PHASE_DURATION: Record<BreathingPhase, number>
     growTime: number
     holdTime: number
     applySettings: (values: {
          exerciseTime: string
          pattern: BreathingPatternId
     }) => void
}
const BreathingExerciseContext = createContext<BreathingExerciseContextValues | null>(null);

export default function BreathingExerciseProvider({children}: {children: React.ReactNode}) {
     const phaseIndexRef = useRef(0);
     const lastPhase = useRef<CirclePhase>(null);
     const audioRef = useRef<HTMLAudioElement>(null);
     
     const [state, setStateRaw] = useState<BreathingExerciseState>({
          text: "inhale",
          circleType: "growing",
          open: false,
          volume: 0,
          time: EXERCISE_INTERVAL_TIME / 1000,
          pattern: "inhale-hold-exhale"
     });
     const setState = (overrides: Partial<BreathingExerciseState>) => setStateRaw((prev) => ({ ...prev, ...overrides }));

     const cycleMs = state.time * 1000;
     const holdTime = useMemo(()=>cycleMs/5, [cycleMs]);
     const growTime = holdTime * 2;
     const PHASE_DURATION: Record<BreathingPhase, number> = {
          inhale: growTime,
          hold: holdTime,
          exhale: growTime,
     };

     const SOUND_BY_PHASE: Record<CirclePhase, string> = {
          growing: Math.round(growTime/1000) >= 7 ? "/sounds/breathe-in-long.mp3" : "/sounds/breathe-in.mp3",
          hold: Math.round(holdTime/1000) >= 5 ? "/sounds/hold-long.mp3" : "/sounds/hold.mp3",
          shrinking: Math.round(growTime/1000) >= 7 ? "/sounds/breathe-out-long.mp3" : "/sounds/breathe-out.mp3",
     };
     useEffect(() => {
          const phases: BreathingPhase[] = BREATHING_PATTERNS[state.pattern];
          let timeout: ReturnType<typeof setTimeout>;
          phaseIndexRef.current = 0;
          const runPhase = () => {
               const phase = phases[phaseIndexRef.current];
               setStateRaw((prev) => ({
                    ...prev,
                    prevCircleType: prev.circleType,
                    text: phase,
                    circleType: PHASE_TO_CIRCLE[phase]
               }));
               phaseIndexRef.current = (phaseIndexRef.current + 1) % phases.length;
               timeout = setTimeout(runPhase, PHASE_DURATION[phase]);
          };
          runPhase();
          return () => clearTimeout(timeout);
     }, [state.pattern, growTime, holdTime]);

     useEffect(()=>{
          preloadAudio(
               "/sounds/breathe-in.mp3",
               "/sounds/hold.mp3",
               "/sounds/breathe-out.mp3",
               "/sounds/breathe-in-long.mp3",
               "/sounds/hold-long.mp3",
               "/sounds/breathe-out-long.mp3"
          )
          audioRef.current = new Audio();
          audioRef.current.preload = "auto";
     }, []);

     useEffect(() => {
          if (!audioRef.current || state.volume === 0) return;
          if (lastPhase.current === state.circleType) return;

          lastPhase.current = state.circleType;
          
          audioRef.current.src = SOUND_BY_PHASE[state.circleType];
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
     }, [state.circleType, state.volume]);

     useEffect(()=>{
          if(!audioRef.current) return;
          audioRef.current.volume = Math.min(1,Math.max(0,state.volume/100));
     },[state.volume])
     
     const applySettings = ({exerciseTime, pattern}: {
          pattern: BreathingPatternId,
          exerciseTime: string
     }) => {
          setState({
               time: Number(exerciseTime),
               pattern,
          });
     };
     
     const value = useMemo(() => ({
          state,
          setState,
          PHASE_DURATION,
          growTime,
          holdTime,
          applySettings,
     }), [state, growTime, holdTime]);

     return (
          <BreathingExerciseContext.Provider value={value}>
               {children}
          </BreathingExerciseContext.Provider>
     );
}

export function useBreathingExercise(){
     const context = useContext(BreathingExerciseContext);
     if (!context) throw new Error("useBreathingExercise must be used within a BreathingExerciseProvider");
     return context;
}