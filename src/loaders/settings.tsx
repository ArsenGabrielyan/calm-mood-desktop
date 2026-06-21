import { Skeleton } from "@/components/ui/skeleton";
import { ExercisePresetsLoader, FormFieldLoader, PomodoroPresetsLoader } from "./field";
import { Field, FieldSet, FieldGroup, FieldContent, FieldSeparator } from "@/components/ui/field";
import { PRESETS } from "@/lib/constants";

export function ExerciseSettingsLoader(){
     return (
          <FieldSet>
               <FieldGroup className="gap-4">
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
               <FieldGroup className="w-full gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <FormFieldLoader/>
                         <FormFieldLoader/>
                         <FormFieldLoader/>
                         <FormFieldLoader/>
                    </div>
               </FieldGroup>
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