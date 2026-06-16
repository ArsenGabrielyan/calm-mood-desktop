import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useLocation } from "react-router"

interface ActionButtonsLoaderProps{
     noVariant?: boolean
}
export default function ActionButtonsLoader({noVariant=false}: ActionButtonsLoaderProps){
     const location = useLocation()
     return (
          <div className="fixed bottom-0 left-0 w-full flex justify-between items-center gap-2 p-4 bg-linear-to-b from-transparent to-secondary backdrop-blur-xs z-20 flex-wrap">
               <Skeleton className="h-9 w-[108px] rounded-4xl"/>
               {location.pathname==="/sounds" && (
                    <div className="flex items-center gap-2">
                         <Skeleton className="size-9"/>
                         <Skeleton className="size-9"/>
                    </div>
               )}
               <Skeleton className={cn("h-9 rounded-4xl", noVariant ? "w-24" : "w-[132px]")}/>
          </div>
     )
}