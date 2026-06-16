import { Skeleton } from "@/components/ui/skeleton";
import WindowWrapperLoader from "./window";
import VolumeSliderLoader from "./volume-slider";

export default function BreathingExerciseLoader(){
     return (
          <WindowWrapperLoader className="flex justify-center items-center breathing-root">
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-6 flex justify-center items-center flex-col gap-4 max-w-[400px] relative group">
                    <Skeleton className="size-60 xs:size-[270px] sm:size-72 rounded-full"/>
                    <Skeleton className="h-9 sm:h-10 w-3/4"/>
                    <VolumeSliderLoader/>
               </div>
          </WindowWrapperLoader>
     )
}