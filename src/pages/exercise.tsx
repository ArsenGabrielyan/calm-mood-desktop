import BreathingExerciseProvider from "@/context/breathing-exercise";
import BreathingExerciseContent from "@/contents/breathing-exercise";

export default function BreathingExercisePage(){
     return (
          <BreathingExerciseProvider>
               <BreathingExerciseContent/>
          </BreathingExerciseProvider>
     )
}