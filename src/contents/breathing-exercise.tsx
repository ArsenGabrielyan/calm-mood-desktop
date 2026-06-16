import WindowWrapper from "@/components/window";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useBreathingExercise } from "@/context/breathing-exercise";

export default function BreathingExerciseContent(){
     const { t } = useTranslation("breathing-exercise");
     const { state, setState, growTime, holdTime, volumeIcon } = useBreathingExercise()
     const phaseText = useMemo(() => {
          if (state.text === "inhale") return t("breatheIn");
          if (state.text === "hold") return t("hold");
          return t("breatheOut");
     }, [state.text, t]);
     const holdCircle = cn(
          "animate-hold-circle",
          state.circleType === "hold" && state.prevCircleType === "shrinking" && "scale-[0.25]",
          state.circleType === "hold" && state.prevCircleType === "growing" && "scale-100"
     );
     return (
          <WindowWrapper title={t("title")} className="flex justify-center items-center breathing-root" variant="breathing-exercise">
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-6 flex justify-center items-center flex-col gap-4 max-w-[400px] relative group">
                    <div className="size-60 xs:size-[270px] sm:size-72 flex justify-center items-center rounded-full will-change-transform border-2 border-primary/50">
                         <div className={cn("bg-primary rounded-full size-full",state.circleType==='growing' ? 'animate-grow-circle' : state.circleType==="hold" ? holdCircle : "animate-shrink-circle")} style={{
                              animationDuration: state.circleType === "growing" ? `${growTime}ms` : state.circleType === "shrinking" ? `${growTime}ms` : `${holdTime}ms`
                         }}/>
                    </div>
                    <p className="font-heading text-3xl sm:text-4xl font-semibold text-primary" aria-live="polite">{phaseText}</p>
                    <div className="flex items-center gap-2 w-full">
                         {volumeIcon}
                         <Slider
                              value={[state.volume]}
                              min={0}
                              max={100}
                              onValueChange={([newVolume]) => setState({ volume: newVolume })}
                         />
                    </div>
               </div>
          </WindowWrapper>
     )
}