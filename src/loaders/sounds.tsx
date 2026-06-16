import { soundIds } from "@/lib/sounds";
import WindowWrapperLoader from "./window";
import { Skeleton } from "@/components/ui/skeleton";
import VolumeSliderLoader from "./volume-slider";

function SoundCardLoader(){
     return (
          <div className="w-full max-w-[250px] flex justify-between items-center flex-wrap flex-col md:flex-row gap-4 bg-card/40 backdrop-blur-sm text-card-foreground py-4 px-3 lg:max-w-xs rounded-md border shadow-xs">
               <Skeleton className="size-[85px]"/>
               <div className="w-full md:w-fit flex-2 flex flex-col items-center justify-between gap-4">
                    <Skeleton className="h-5 xs:h-6 sm:h-8 md:h-7 w-3/4"/>
                    <VolumeSliderLoader/>
               </div>
          </div>
     )
}
export default function SoundsPageLoader(){
     return (
          <WindowWrapperLoader className="mt-8 mb-12 flex justify-center items-center flex-col gap-2" noVariant>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5 w-full max-w-5xl">
                    {soundIds.map(val=>(
                         <SoundCardLoader key={val}/>
                    ))}
               </div>
          </WindowWrapperLoader>
     )
}