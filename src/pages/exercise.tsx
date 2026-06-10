import WindowWrapper from "@/components/window";
import useExercise from "@/hooks/use-breathing-exercise";
import { EXERCISE_INTERVAL_TIME } from "@/lib/constants";
import { BREATHING_PATTERNS, PHASE_TO_CIRCLE } from "@/lib/constants/maps";
import { BreathingExerciseState, BreathingPhase } from "@/lib/types/breathing-exercise";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function BreathingExercisePage(){
     const { t } = useTranslation("breathing-exercise");
     const phaseIndexRef = useRef(0);
     const [exerciseState, setExerciseState] = useState<BreathingExerciseState>({
          text: "inhale",
          circleType: "growing",
          open: false,
          volume: 0,
          time: EXERCISE_INTERVAL_TIME / 1000,
          pattern: "inhale-hold-exhale"
     });
     const setState = (overrides: Partial<BreathingExerciseState>) => setExerciseState((prev) => ({ ...prev, ...overrides }));
     const { PHASE_DURATION, volumeIcon, growTime, holdTime } = useExercise(exerciseState);
     const { text, circleType, volume, pattern, prevCircleType } = exerciseState;
     useEffect(() => {
          const phases: BreathingPhase[] = BREATHING_PATTERNS[pattern];
          let timeout: ReturnType<typeof setTimeout>;
          phaseIndexRef.current = 0;
          const runPhase = () => {
               const phase = phases[phaseIndexRef.current];
               setExerciseState((prev) => ({
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
     }, [pattern, growTime, holdTime]);
     const phaseText = useMemo(() => {
          if (text === "inhale") return t("breatheIn");
          if (text === "hold") return t("hold");
          return t("breatheOut");
     }, [text, t]);
     const holdCircle = cn(
          "animate-hold-circle",
          circleType === "hold" && prevCircleType === "shrinking" && "scale-[0.25]",
          circleType === "hold" && prevCircleType === "growing" && "scale-100"
     );
     return (
          <WindowWrapper title={t("title")} className="flex justify-center items-center breathing-root">
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-6 flex justify-center items-center flex-col gap-4 max-w-[400px] relative group">
                    <div className="size-72 flex justify-center items-center rounded-full will-change-transform border-2 border-primary/50">
                         <div className={cn("bg-primary rounded-full size-full",circleType==='growing' ? 'animate-grow-circle' : circleType==="hold" ? holdCircle : "animate-shrink-circle")} style={{
                              animationDuration: circleType === "growing" ? `${growTime}ms` : circleType === "shrinking" ? `${growTime}ms` : `${holdTime}ms`
                         }}/>
                    </div>
                    <p className="font-heading text-4xl font-semibold text-primary" aria-live="polite">{phaseText}</p>
                    <div className="flex items-center gap-2 w-full">
                         {volumeIcon}
                         <Slider
                              value={[volume]}
                              min={0}
                              max={100}
                              onValueChange={([newVolume]) => setState({ volume: newVolume })}
                         />
                    </div>
               </div>
          </WindowWrapper>
     )
}