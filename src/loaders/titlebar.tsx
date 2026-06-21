import { Skeleton } from "@/components/ui/skeleton";

export function WindowControlLoader(){
     return (
          <div className="flex items-center">
               <Skeleton className="size-9 bg-muted/50"/>
               <Skeleton className="size-9 bg-muted/50"/>
               <Skeleton className="size-9 bg-muted/50"/>
          </div>
     )
}
export default function TitlebarLoader(){
     return (
          <div className="flex items-center justify-between gap-2 bg-linear-to-b from-secondary to-transparent text-foreground pl-2 fixed top-0 left-0 z-30 w-full h-10 backdrop-blur-xs">
               <Skeleton className="size-[30px]"/>
               <div className="flex-1 h-full flex items-center ml-1 select-none text-base">
                    <Skeleton className="h-3 sm:h-3.5 md:h-4 w-1/3"/>
               </div>
               <WindowControlLoader/>
          </div>
     )
}