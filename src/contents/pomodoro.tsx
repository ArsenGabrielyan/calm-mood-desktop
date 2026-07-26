import WindowWrapper from "@/components/window";
import { lazy, Suspense } from "react";
import { usePomodoro } from "@/context/pomodoro";
import { PomodoroTimerLoader } from "@/loaders/pomodoro";

const PomodoroTimer = lazy(()=>import("@/components/pomodoro-timer"));

export default function PomodoroContent(){
     const { t } = usePomodoro()
     return (
          <WindowWrapper title={t("title")} variant="pomodoro">
               <Suspense fallback={<PomodoroTimerLoader/>}>
                    <PomodoroTimer/>
               </Suspense>
          </WindowWrapper>
     )
}