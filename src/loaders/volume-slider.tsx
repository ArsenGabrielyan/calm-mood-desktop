import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface VolumeSliderLoaderProps{
     className?: string
}
export default function VolumeSliderLoader({className}: VolumeSliderLoaderProps){
     return (
          <div className={cn("flex items-center gap-2 w-full",className)}>
               <Skeleton className="size-6"/>
               <Skeleton className="flex-1 h-1.5"/>
          </div>
     )
}