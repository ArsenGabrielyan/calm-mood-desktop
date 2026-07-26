import WindowWrapper from "@/components/window";
import { lazy, Suspense, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useBreathingExercise } from "@/context/breathing-exercise";
import VolumeSliderLoader from "@/loaders/volume-slider";
import { Skeleton } from "@/components/ui/skeleton";

const VolumeSlider = lazy(()=>import("@/components/volume-slider"));
const BreathingCircle = lazy(()=>import("@/components/breathing-circle"));

export default function BreathingExerciseContent(){
     const { t } = useTranslation("breathing-exercise");
     const { state, setState } = useBreathingExercise()
     const phaseText = useMemo(() => {
          if (state.text === "inhale") return t("breatheIn");
          if (state.text === "hold") return t("hold");
          return t("breatheOut");
     }, [state.text, t]);
     return (
          <WindowWrapper title={t("title")} className="flex justify-center items-center breathing-root" variant="breathing-exercise">
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-6 flex justify-center items-center flex-col gap-4 max-w-100 relative group">
                    <Suspense fallback={<Skeleton className="size-60 xs:size-67.5 sm:size-72 rounded-full"/>}>
                         <BreathingCircle/>
                    </Suspense>
                    <p className="font-heading text-3xl sm:text-4xl font-semibold text-primary" aria-live="polite">{phaseText}</p>
                    <Suspense fallback={<VolumeSliderLoader/>}>
                         <VolumeSlider
                              value={state.volume}
                              onChange={newVolume=>setState({ volume: newVolume })}
                         />
                    </Suspense>
               </div>
          </WindowWrapper>
     )
}