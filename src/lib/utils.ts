import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDailyBackground(): React.CSSProperties{
  const mod = Math.floor(Date.now() / (1000*60*60*24)) % 10;
  const jpg = `/backgrounds/bg-${mod+1}.jpg`;
  const webp = `/backgrounds/bg-${mod+1}.webp`
  return {
    background: `url(${webp}), url(${jpg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  }
}

export function preloadAudio(...audioFiles: string[]) {
  const set = new Set(audioFiles);
  const arr = audioFiles.filter(([key])=>set.has(key)).map((entries)=>entries[1]);
  arr.forEach(src => {
    const audio = new Audio(src);
    audio.load();
  });
}