import { Skeleton } from "@/components/ui/skeleton";
import WindowWrapperLoader from "./window";

export default function AboutLoader(){
     return (
          <WindowWrapperLoader>
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col gap-2 max-w-[400px] w-full">
                    <Skeleton className="w-full max-w-[480px] h-[163px]"/>
                    <Skeleton className="h-5 md:h-6 lg:h-8 xl:h-9 w-3/4"/>
               </div>
          </WindowWrapperLoader>
     )
}