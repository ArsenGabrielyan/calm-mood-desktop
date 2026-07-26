import { Skeleton } from "@/components/ui/skeleton";
import { ExercisePresetsLoader, ExerciseSecondsInputLoader, PomodoroCustomInputLoader, PomodoroPresetsLoader } from "./field";
import { Field, FieldSet, FieldGroup, FieldSeparator } from "@/components/ui/field";

export function ExerciseSettingsLoader(){
     return (
          <FieldSet>
               <FieldGroup className="gap-4">
                    <ExerciseSecondsInputLoader/>                    
                    <FieldSeparator/>
                    <ExercisePresetsLoader/>
               </FieldGroup>
               <Field orientation="horizontal">
                    <Skeleton className="h-9 w-13"/>
                    <Skeleton className="h-9 w-15"/>
               </Field>
          </FieldSet>
     )
}
export function PomodoroSettingsLoader(){
     return (
          <FieldSet className="w-full gap-4">
               <PomodoroCustomInputLoader/>
               <FieldSeparator/>
               <PomodoroPresetsLoader/>
               <Field orientation="horizontal">
                    <Skeleton className="h-9 w-13"/>
                    <Skeleton className="h-9 w-15"/>
                    <Skeleton className="h-9 w-16"/>
               </Field>
          </FieldSet>
     )
}