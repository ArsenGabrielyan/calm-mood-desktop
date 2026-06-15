import PomodoroContent from "@/contents/pomodoro";
import { PomodoroProvider } from "@/context/pomodoro";

export default function PomodoroPage(){
     return (
          <PomodoroProvider>
               <PomodoroContent/>
          </PomodoroProvider>
     )
}