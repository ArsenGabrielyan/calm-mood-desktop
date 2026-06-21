import { Field } from "@/components/ui/field"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface FormFieldLoaderProps{
     type?: "input" | "switch",
     includeDescription?: boolean,
     className?: string
}
export function FormFieldLoader({type="input", includeDescription=false, className}: FormFieldLoaderProps){
     if(type==="switch") return (
          <Field orientation="horizontal" className={cn("justify-between",className)}>
               <Skeleton className="h-5 w-full max-w-32"/>
               <Skeleton className="h-[18px] w-8 rounded-full"/>
          </Field>
     )
     return (
          <Field className={cn(className)}>
               <Skeleton className="h-5 w-full max-w-24"/>
               <Skeleton className="h-8 w-full"/>
               {includeDescription && (
                    <div className="space-y-1">
                         <Skeleton className="h-3.5 w-full"/>
                         <Skeleton className="h-3.5 w-full max-w-3/4"/>
                    </div>
               )}
          </Field>
     )
}
export function PomodoroPresetsLoader(){
     return (
          <Field>
               <Skeleton className="h-5 w-full max-w-24"/>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <Skeleton className="h-[69px] w-full"/>
                    <Skeleton className="h-[69px] w-full"/>
                    <Skeleton className="h-[69px] w-full"/>
                    <Skeleton className="h-[69px] w-full"/>
                    <Skeleton className="h-[69px] w-full"/>
                    <Skeleton className="h-[69px] w-full"/>
               </div>
          </Field>
     )
}
export function ExercisePresetsLoader(){
     return (
          <Field>
               <Skeleton className="h-5 w-full max-w-24"/>
               <div className="space-y-3">
                    <Skeleton className="w-full h-11"/>
                    <Skeleton className="w-full h-11"/>
                    <Skeleton className="w-full h-11"/>
                    <Skeleton className="w-full h-11"/>
               </div>
          </Field>
     )
}