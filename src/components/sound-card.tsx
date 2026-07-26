"use client";
import { ISounds } from "@/lib/types";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useSound } from "@/context/sounds";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import VolumeSliderLoader from "@/loaders/volume-slider";

const VolumeSlider = lazy(()=>import("./volume-slider"));

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
                    <Suspense fallback={<Skeleton className="size-21.25"/>}>
                         <Icon className={cn("size-21.25", state.loading ? "fill-primary/25" : "fill-primary")}/>
                    </Suspense>
               </div>
               <div className="w-full md:w-fit flex-2 flex flex-col items-center justify-between gap-4">
                    <h2 className="text-2xl xs:text-3xl sm:text-2xl font-semibold text-primary text-center font-sans">
                         {t(`sounds.${id}`)}
                    </h2>
                    <Suspense fallback={<VolumeSliderLoader/>}>
                         <VolumeSlider
                              value={state.volume}
                              onChange={handleVolumeChange}
                         />
                    </Suspense>
               </div>
          </div>
     );
}