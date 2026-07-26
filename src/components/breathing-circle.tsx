import { cn } from "@/lib/utils";
import { useBreathingExercise } from "@/context/breathing-exercise";

export default function BreathingCircle(){
     const { state, growTime, holdTime } = useBreathingExercise()
     const holdCircle = cn(
          "animate-hold-circle",
          state.circleType === "hold" && state.prevCircleType === "shrinking" && "scale-[0.25]",
          state.circleType === "hold" && state.prevCircleType === "growing" && "scale-100"
     );
     return (
          <div className="size-60 xs:size-67.5 sm:size-72 flex justify-center items-center rounded-full will-change-transform border-2 border-primary/50">
               <div className={cn("bg-primary rounded-full size-full",state.circleType==='growing' ? 'animate-grow-circle' : state.circleType==="hold" ? holdCircle : "animate-shrink-circle")} style={{
                    animationDuration: state.circleType === "growing" ? `${growTime}ms` : state.circleType === "shrinking" ? `${growTime}ms` : `${holdTime}ms`
               }}/>
          </div>
     )
}