import { Field, FieldContent, FieldGroup } from "@/components/ui/field"
import { Skeleton } from "@/components/ui/skeleton"
import { PRESETS } from "@/lib/constants"
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
               <Skeleton className="h-4.5 w-8 rounded-full"/>
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
                    <Skeleton className="h-17.25 w-full"/>
                    <Skeleton className="h-17.25 w-full"/>
                    <Skeleton className="h-17.25 w-full"/>
                    <Skeleton className="h-17.25 w-full"/>
                    <Skeleton className="h-17.25 w-full"/>
                    <Skeleton className="h-17.25 w-full"/>
               </div>
          </Field>
     )
}
export function PomodoroCustomInputLoader(){
     return (
          <FieldGroup className="w-full gap-4">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormFieldLoader/>
                    <FormFieldLoader/>
                    <FormFieldLoader/>
                    <FormFieldLoader/>
               </div>
          </FieldGroup>
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
export function ExerciseSecondsInputLoader(){
     return (
          <>
          <Field orientation="responsive">
               <FieldContent className="flex-5">
                    <Skeleton className="h-5 w-full max-w-32"/>
                    <div className="space-y-1">
                         <Skeleton className="h-5 w-full max-w-16"/>
                         <Skeleton className="h-5 w-full max-w-24"/>
                    </div>
               </FieldContent>
               <FormFieldLoader className="flex-1"/>
          </Field>
          <Field>
               <Skeleton className="h-5 w-full max-w-24"/>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {PRESETS.map(({id})=>(
                         <Skeleton className="h-9 flex-1" key={id}/>
                    ))}
               </div>
          </Field>
          </>
     )
}