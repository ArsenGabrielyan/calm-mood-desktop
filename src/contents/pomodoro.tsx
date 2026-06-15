import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WindowWrapper from "@/components/window";
import { Pause, Play, Square } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { usePomodoro } from "@/context/pomodoro";

export default function PomodoroContent(){
     const { runtime, pause, resume, stop, t, start } = usePomodoro()
     const minutes = useMemo(()=>!runtime ? "00" : Math.floor(runtime.remaining / 60)
          .toString()
          .padStart(2, "0")
     ,[runtime?.remaining]);
     const seconds = useMemo(()=>!runtime ? "00" : (runtime.remaining % 60)
          .toString()
          .padStart(2, "0")
     ,[runtime?.remaining]);
     return (
          <WindowWrapper title={t("title")} variant="pomodoro">
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col w-full mt-4 gap-4 max-w-xs">
                    <h2 className={cn("text-muted-foreground text-center",runtime.phase==="idle" ? "text-sm md:text-base" : "text-lg md:text-xl lg:text-2xl")}>{
                         runtime.phase!=="idle" ? t(`phase.${runtime.phase}`) : t("tip")
                    }</h2>
                    <h2 className="text-6xl md:text-7xl">{minutes}:{seconds}</h2>
                    <Progress value={(1 - runtime.remaining / runtime.total) * 100}/>
                    <div className="flex justify-center items-center flex-wrap gap-2 w-full">
                         <Button className="flex-1" onClick={() => runtime.phase === "idle" ? start() : runtime.isPaused ? resume() : pause()}>
                              {(runtime.isPaused || runtime.phase==="idle") ? <Play/> : <Pause/>}
                              {runtime.phase==="idle" ? t("start") : runtime.isPaused ? t("continue") : t("pause")}
                         </Button>
                         <Button className="flex-1" onClick={stop}>
                              <Square/> {t("stop")}
                         </Button>
                    </div>
               </div>
          </WindowWrapper>
     )
}