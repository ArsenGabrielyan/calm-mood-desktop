import { Skeleton } from "@/components/ui/skeleton";
import WindowWrapperLoader from "./window";

export default function UpdaterLoader(){
     return (
          <WindowWrapperLoader>
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col gap-2 max-w-[400px] w-full">
                    <Skeleton className="h-5 md:h-6 lg:h-[30px] w-full"/>
                    <Skeleton className="h-4 w-1/3"/>
                    <Skeleton className="h-9 w-40"/>
               </div>
          </WindowWrapperLoader>
     )
}