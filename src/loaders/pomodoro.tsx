import { Skeleton } from "@/components/ui/skeleton";
import WindowWrapperLoader from "./window";

export default function PomodoroLoader(){
     return (
          <WindowWrapperLoader className="w-full">
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col mt-4 gap-4 max-w-xs w-full">
                    <div className="flex gap-1 justify-center items-center flex-col w-full">
                         <Skeleton className="h-4 w-full"/>
                         <Skeleton className="h-4 w-3/4"/>
                    </div>
                    <Skeleton className="h-9 xs:h-12 sm:h-[60px] md:h-[72px] w-full"/>
                    <Skeleton className="w-full h-1.5 rounded-full"/>
                    <div className="flex justify-center items-center flex-wrap gap-2 w-full">
                         <Skeleton className="h-9 flex-1 min-w-14"/>
                         <Skeleton className="h-9 flex-1 min-w-14"/>
                    </div>
               </div>
          </WindowWrapperLoader>
     )
}