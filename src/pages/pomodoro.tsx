import { PomodoroProvider } from "@/context/pomodoro";
import PomodoroLoader from "@/loaders/pomodoro";
import { lazy, Suspense } from "react";

const PomodoroContent = lazy(()=>import("@/contents/pomodoro"));

export default function PomodoroPage(){
     return (
          <PomodoroProvider>
               <Suspense fallback={<PomodoroLoader/>}>
                    <PomodoroContent/>
               </Suspense>
          </PomodoroProvider>
     )
}