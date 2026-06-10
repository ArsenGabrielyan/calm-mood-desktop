import { Button } from "../ui/button";
import { Cog, Pause, Play, Square, Timer, Waves, Wind } from "lucide-react";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggler";
import { useTranslation } from "react-i18next";
import { useSound } from "@/context/sounds";
import { useMemo } from "react";

export default function ActionButtons(){
     const {t} = useTranslation()
     const {t: soundTxt} = useTranslation("sounds")
     const location = useLocation()
     const {handlePlayPause, playback, setPlayback} = useSound()
     const label = useMemo(()=>playback === "playing" ? "pause" : playback === "paused" ? "resume" : "play",[playback])
     return (
          <div className="fixed bottom-0 left-0 w-full flex justify-between items-center gap-2 p-4 bg-linear-to-b from-transparent to-secondary backdrop-blur-xs z-20">
               <div className="bg-card text-card-foreground shadow-xs border-0 rounded-4xl">
                    <Button
                         className="shadow-xs text-primary rounded-l-4xl"
                         variant={location.pathname==="/" ? "secondary" : "ghost"} 
                         size="icon" title={t("buttons.exercise")} asChild
                    >
                         <Link to="/">
                              <Wind className="size-5"/>
                         </Link>
                    </Button>
                    <Button
                         className="shadow-xs hover:text-primary rounded-none"
                         variant={location.pathname==="/sounds" ? "secondary" : "ghost"}
                         size="icon" title={t("buttons.sounds")} asChild
                    >
                         <Link to="/sounds">
                              <Waves className="size-5"/>
                         </Link>
                    </Button>
                    <Button
                         className="shadow-xs hover:text-primary rounded-r-4xl"
                         variant={location.pathname==="/pomodoro" ? "secondary" : "ghost"}
                         size="icon" title={t("buttons.pomodoro")} asChild
                    >
                         <Link to="/pomodoro">
                              <Timer className="size-5"/>
                         </Link>
                    </Button>
               </div>
               {location.pathname==="/sounds" && (
                    <div className="flex items-center gap-3">
                         <Button size="icon" onClick={handlePlayPause} title={soundTxt(label)}>
                              {playback==="playing" ? <Pause className="size-5"/> : <Play className="size-5"/>}
                         </Button>
                         <Button size="icon" title={soundTxt("stop")} disabled={playback==="idle"} onClick={()=>setPlayback("idle")}>
                              <Square className="size-5"/>
                         </Button>
                    </div>
               )}
               <div className="bg-card text-card-foreground shadow-xs border-0 rounded-4xl">
                    <Button 
                         className="shadow-xs text-primary rounded-l-4xl"
                         variant="ghost"
                         size="icon" title={t("buttons.settings")}
                    >
                         <Cog className="size-5"/>
                    </Button>
                    <ModeToggle/>
               </div>
          </div>
     )
}