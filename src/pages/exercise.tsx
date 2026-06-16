import BreathingExerciseProvider from "@/context/breathing-exercise";
import BreathingExerciseLoader from "@/loaders/breathing-exercise";
import { lazy, Suspense } from "react";

const BreathingExerciseContent = lazy(()=>import("@/contents/breathing-exercise"));

export default function BreathingExercisePage(){
     return (
          <BreathingExerciseProvider>
               <Suspense fallback={<BreathingExerciseLoader/>}>
                    <BreathingExerciseContent/>
               </Suspense>
          </BreathingExerciseProvider>
     )
}