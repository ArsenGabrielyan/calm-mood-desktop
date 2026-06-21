import { Button } from "../ui/button";
import { Pause, Play, Square, Timer, Waves, Wind } from "lucide-react";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggler";
import { useTranslation } from "react-i18next";
import { useSound } from "@/context/sounds";
import { lazy, Suspense, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const SettingsButton = lazy(()=>import("../settings"));
const LanguageSwitcher = lazy(()=>import("@/i18n/languages"))

interface ActionButtonsProps{
     variant?: "breathing-exercise" | "pomodoro"
}
export default function ActionButtons({variant}: ActionButtonsProps){
     const {t} = useTranslation()
     const {t: soundTxt} = useTranslation("sounds")
     const location = useLocation()
     const {handlePlayPause, playback, setPlayback} = useSound()
     const label = useMemo(()=>playback === "playing" ? "pause" : playback === "paused" ? "resume" : "play",[playback])
     return (
          <div className="fixed bottom-0 left-0 w-full flex justify-center 2xs:justify-between items-center gap-2 p-4 bg-linear-to-b from-transparent to-secondary backdrop-blur-xs z-20 flex-wrap">
               <div className="bg-card text-card-foreground shadow-xs border-0 rounded-4xl flex items-center justify-center">
                    <Button
                         className={cn("shadow-xs rounded-l-4xl", location.pathname==="/" ? "text-primary" : "hover:text-primary")}
                         variant={location.pathname==="/" ? "secondary" : "ghost"} 
                         size="icon" title={t("buttons.exercise")} asChild
                    >
                         <Link to="/">
                              <Wind className="size-5"/>
                         </Link>
                    </Button>
                    <Button
                         className={cn("shadow-xs rounded-none", location.pathname==="/sounds" ? "text-primary" : "hover:text-primary")}
                         variant={location.pathname==="/sounds" ? "secondary" : "ghost"}
                         size="icon" title={t("buttons.sounds")} asChild
                    >
                         <Link to="/sounds">
                              <Waves className="size-5"/>
                         </Link>
                    </Button>
                    <Button
                         className={cn("shadow-xs rounded-r-4xl", location.pathname==="/pomodoro" ? "text-primary" : "hover:text-primary")}
                         variant={location.pathname==="/pomodoro" ? "secondary" : "ghost"}
                         size="icon" title={t("buttons.pomodoro")} asChild
                    >
                         <Link to="/pomodoro">
                              <Timer className="size-5"/>
                         </Link>
                    </Button>
               </div>
               {location.pathname==="/sounds" && (
                    <div className="flex items-center gap-2">
                         <Button size="icon" onClick={handlePlayPause} title={soundTxt(label)}>
                              {playback==="playing" ? <Pause className="size-5"/> : <Play className="size-5"/>}
                         </Button>
                         <Button size="icon" title={soundTxt("stop")} disabled={playback==="idle"} onClick={()=>setPlayback("idle")}>
                              <Square className="size-5"/>
                         </Button>
                    </div>
               )}
               <div className="bg-card text-card-foreground shadow-xs border-0 rounded-4xl flex items-center justify-center">
                    {variant && (
                         <Suspense fallback={<Skeleton className="size-9 rounded-l-4xl"/>}>
                              <SettingsButton variant={variant}/>
                         </Suspense>
                    )}
                    <ModeToggle noVariant={!variant}/>
                    <Suspense fallback={<Skeleton className="w-15 h-9 rounded-r-4xl"/>}>
                         <LanguageSwitcher/>
                    </Suspense>
               </div>
          </div>
     )
}