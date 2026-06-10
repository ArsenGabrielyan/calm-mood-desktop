import { PlayBackType } from "@/lib/types";
import { resolveResource } from "@tauri-apps/api/path";
import { readFile } from "@tauri-apps/plugin-fs";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type SoundUiState = {
     volume: number;
     loaded: boolean;
     loading: boolean;
};

type SoundContextValues = {
     playback: PlayBackType;
     setPlayback: React.Dispatch<React.SetStateAction<PlayBackType>>;
     handlePlayPause: () => void;
     sounds: Record<string, SoundUiState>;
     setVolume: (id: string, volume: number) => void;
     loadSound: (id: string, url: string) => Promise<void>;
};

const SoundContext = createContext<SoundContextValues | null>(null);

export default function SoundProvider({ children }: { children: React.ReactNode }) {
     const [playback, setPlayback] = useState<PlayBackType>("idle");
     const [soundsState, setSoundsState] = useState<Record<string, SoundUiState>>({});

     const audiosRef = useRef<Record<string, HTMLAudioElement>>({});
     const objectUrlsRef = useRef<Record<string, string>>({});
     const loadingRef = useRef<Set<string>>(new Set());

     const handlePlayPause = useCallback(() => {
          setPlayback((prev) => (prev === "playing" ? "paused" : "playing"));
     }, []);

     const loadSound = useCallback(async (id: string, url: string) => {
          if (audiosRef.current[id] || loadingRef.current.has(id)) return;

          loadingRef.current.add(id);
          setSoundsState((prev) => ({
               ...prev,
               [id]: {
                    volume: prev[id]?.volume ?? 0,
                    loaded: false,
                    loading: true,
               },
          }));

          try {
               const path = await resolveResource(`sounds/${url}`);
               const bytes = await readFile(path);

               const blob = new Blob([bytes], { type: "audio/mpeg" });
               const objectUrl = URL.createObjectURL(blob);

               const audio = new Audio(objectUrl);
               audio.loop = true;
               audio.preload = "auto";
               audio.volume = (soundsState[id]?.volume ?? 0) / 100;

               audiosRef.current[id] = audio;
               objectUrlsRef.current[id] = objectUrl;

               setSoundsState(prev => ({
                    ...prev,
                    [id]: {
                         volume: prev[id]?.volume ?? 0,
                         loaded: true,
                         loading: false,
                    },
               }));

               if (playback === "playing") {
                    const pendingVolume = soundsState[id]?.volume ?? 0;
                    audio.volume = pendingVolume / 100;
                    if (pendingVolume > 0) {
                         void audio.play().catch(console.error);
                    }
               }
          } catch (error) {
               console.error(`Failed to load sound "${id}"`, error);
               setSoundsState((prev) => ({
                    ...prev,
                    [id]: {
                         volume: prev[id]?.volume ?? 0,
                         loaded: false,
                         loading: false,
                    },
               }));
          } finally {
               loadingRef.current.delete(id);
          }
     }, [soundsState]);

     const setVolume = useCallback((id: string, volume: number) => {
          const audio = audiosRef.current[id];

          setSoundsState(prev => ({
               ...prev,
               [id]: {
                    volume,
                    loaded: prev[id]?.loaded ?? false,
                    loading: prev[id]?.loading ?? false,
               },
          }));

          if (!audio) return;

          audio.volume = Math.min(1, Math.max(0, volume / 100));

          if (volume === 0) {
               audio.pause();
               return;
          }

          if (playback === "playing" && audio.paused) {
               void audio.play().catch(console.error);
          }
     }, [playback]);

     useEffect(() => {
          Object.entries(audiosRef.current).forEach(([id, audio]) => {
               const volume = soundsState[id]?.volume ?? 0;

               if (playback === "playing") {
                    if (volume > 0 && audio.paused) {
                         void audio.play().catch(console.error);
                    }
                    return;
               }

               if (playback === "paused") {
                    audio.pause();
                    return;
               }

               audio.pause();
               audio.currentTime = 0;
          });
     }, [playback, soundsState]);

     useEffect(() => {
          return () => {
               Object.values(audiosRef.current).forEach((audio) => {
                    audio.pause();
                    audio.src = "";
               });

               Object.values(objectUrlsRef.current).forEach((url) => {
                    URL.revokeObjectURL(url);
               });
          };
     }, []);

     const values = useMemo<SoundContextValues>(() => ({
          playback,
          setPlayback,
          handlePlayPause,
          sounds: soundsState,
          setVolume,
          loadSound,
     }), [playback, soundsState, handlePlayPause, setVolume, loadSound]);

     return <SoundContext.Provider value={values}>{children}</SoundContext.Provider>;
}

export const useSound = () => {
     const context = useContext(SoundContext);
     if (!context) throw new Error("useSound must be used within a SoundProvider");
     return context;
};