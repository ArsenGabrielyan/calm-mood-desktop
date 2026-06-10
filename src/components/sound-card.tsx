"use client";
import { ISounds } from "@/lib/types";
import { Slider } from "@/components/ui/slider";
import { useMemo } from "react";
import { Volume, Volume1, Volume2, VolumeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSound } from "@/context/sounds";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

interface SoundCardProps {
     data: ISounds;
}

export default function SoundCard({ data }: SoundCardProps) {
     const { id, Icon, url } = data;
     const { sounds, setVolume, loadSound } = useSound();

     const state = sounds[id] ?? {
          volume: 0,
          loaded: false,
          loading: false,
     };

     const volumeIcon = useMemo(() => {
          if (state.volume < 5) return <VolumeOff />;
          if (state.volume < 10) return <Volume />;
          if (state.volume < 60) return <Volume1 />;
          return <Volume2 />;
     }, [state.volume]);

     const handleVolumeChange = (vol: number) => {
          if (!state.loaded && !state.loading && vol > 0) {
               void loadSound(id, url);
          }
          setVolume(id, vol);
     };
     const { t } = useTranslation("sounds");
     return (
          <div className="w-full max-w-full flex justify-between items-center flex-wrap flex-col md:flex-row gap-4 bg-card/40 backdrop-blur-sm text-card-foreground py-4 px-3 lg:max-w-xs rounded-md border shadow-xs">
               <div className="flex-1 flex items-center justify-center flex-row relative">
                    {state.loading && (
                         <Spinner className="absolute top-1/2 left-1/2 -translate-1/2" />
                    )}
                    <Icon
                         className={cn(
                         state.loading ? "fill-primary/25" : "fill-primary",
                              "size-[85px]"
                         )}
                    />
               </div>
               <div className="w-full md:w-fit flex-2 flex flex-col items-center justify-between gap-4">
                    <h2 className="text-3xl md:text-2xl font-semibold text-primary text-center">
                         {t(`sounds.${id}`)}
                    </h2>
                    <div className="flex items-center gap-2 w-full">
                         {volumeIcon}
                         <Slider
                              value={[state.volume]}
                              min={0}
                              max={100}
                              onValueChange={([vol]) => handleVolumeChange(vol)}
                         />
                    </div>
               </div>
          </div>
     );
}