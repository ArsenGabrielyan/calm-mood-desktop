import { Slider } from "@/components/ui/slider";
import { VolumeOff, Volume, Volume1, Volume2 } from "lucide-react";
import { useMemo } from "react";

interface VolumeSliderProps{
     value: number,
     onChange: (value: number) => void
}
export default function VolumeSlider({value, onChange}: VolumeSliderProps){
     const volumeIcon = useMemo(() => {
          if (value < 5) return <VolumeOff />;
          if (value < 10) return <Volume />;
          if (value < 60) return <Volume1 />;
          return <Volume2 />;
     }, [value]);
     return (
          <div className="flex items-center gap-2 w-full">
               {volumeIcon}
               <Slider
                    value={[value]}
                    min={0}
                    max={100}
                    onValueChange={([val])=>onChange(val)}
               />
          </div>
     )
}