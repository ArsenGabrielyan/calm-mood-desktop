import { Skeleton } from "@/components/ui/skeleton";
import WindowWrapperLoader from "./window";

export function AboutDetailsLoader(){
     return (
          <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col gap-2 max-w-100 w-full">
               <Skeleton className="w-full max-w-120 h-40.75"/>
               <Skeleton className="h-5 md:h-6 lg:h-8 xl:h-9 w-3/4"/>
               <div className="space-y-1 w-full">
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-3/4"/>
               </div>
               <Skeleton className="h-4 w-1/3"/>
               <Skeleton className="h-4 w-1/3"/>
               <div className="flex items-center justify-between gap-2 w-full">
                    <Skeleton className="h-3 w-full"/>
                    <Skeleton className="h-3 w-full"/>
               </div>
          </div>
     )
}
export function AboutLoader(){
     return (
          <WindowWrapperLoader className="space-y-1">
               <AboutDetailsLoader/>
               <div className="w-full max-w-100 flex items-center justify-center flex-wrap gap-1">
                    <Skeleton className="h-9 flex-1"/>
                    <Skeleton className="h-9 flex-1"/>
                    <Skeleton className="h-9 flex-1"/>
               </div>
          </WindowWrapperLoader>
     )
}