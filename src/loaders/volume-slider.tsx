import { Skeleton } from "@/components/ui/skeleton";

export default function VolumeSliderLoader(){
     return (
          <div className="flex items-center gap-2 w-full">
               <Skeleton className="size-6"/>
               <Skeleton className="flex-1 h-1.5"/>
          </div>
     )
}