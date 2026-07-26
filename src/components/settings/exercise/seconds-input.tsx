import { BreathingExerciseType } from "@/lib/types/breathing-exercise"
import { Controller, UseFormReturn } from "react-hook-form"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button"
import { useMemo } from "react"
import { PRESETS } from "@/lib/constants";
import { useTranslation } from "react-i18next";

interface ExerciseSecondsInput{
     form: UseFormReturn<BreathingExerciseType>
}
export default function ExerciseSecondsInput({form}: ExerciseSecondsInput){
     const {t} = useTranslation("breathing-exercise")
     const cycleMs = Number(form.watch("exerciseTime")) * 1000;
     const holdTime = useMemo(()=>cycleMs/5, [cycleMs]);
     const growTime = holdTime * 2;
     return (
          <>
          <Field orientation="responsive">
               <FieldContent>
                    <FieldLabel htmlFor="exercise-time">{t("settings.time")}</FieldLabel>
                    <FieldDescription>
                         <ul>
                              <li>{t("settings.hold",{hold: holdTime/1000})}</li>
                              <li>{t("settings.breathe",{breatheTime: growTime/1000})}</li>
                         </ul>
                    </FieldDescription>
               </FieldContent>
               <Controller
                    control={form.control}
                    name="exerciseTime"
                    render={({field, fieldState})=>(
                         <Field>
                              <FieldLabel>{t("settings.duration")}</FieldLabel>
                              <Input {...field} id="exercise-time" type="number" aria-invalid={fieldState.invalid} min={12} max={300}/>
                              {fieldState.invalid && (
                                   <FieldError errors={[fieldState.error]} />
                              )}
                         </Field>
                    )}
               />
          </Field>
          <Field>
               <FieldLabel>{t("settings.presets")}</FieldLabel>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {PRESETS.map(({id, Icon, seconds})=>(
                         <Button variant={Number(form.watch("exerciseTime"))===seconds ? "default" : "outline"} key={id} onClick={()=>form.setValue("exerciseTime",seconds.toString())} type="button">
                              <Icon className="size-5" />
                              {t("settings.seconds",{count: seconds})}
                         </Button>
                    ))}
               </div>
          </Field>
          </>
     )
}