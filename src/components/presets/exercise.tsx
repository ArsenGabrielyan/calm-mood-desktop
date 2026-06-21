import { BreathingExerciseType, BreathingPatternId } from "@/lib/types/breathing-exercise"
import { Controller, UseFormReturn } from "react-hook-form"
import { Field, FieldContent, FieldError, FieldLabel, FieldTitle } from "../ui/field";
import { BREATHING_PATTERNS } from "@/lib/constants/maps";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useTranslation } from "react-i18next";

interface ExercisePresetsProps{
     form: UseFormReturn<BreathingExerciseType>
}
export default function ExercisePresets({form}: ExercisePresetsProps){
     const {t} = useTranslation("breathing-exercise")
     return (
          <Field>
               <FieldLabel>{t("settings.type")}</FieldLabel>
               <Controller
                    control={form.control}
                    name="pattern"
                    render={({field, fieldState})=>(
                         <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                              {Object.keys(BREATHING_PATTERNS).map(id=>(
                                   <FieldLabel key={id} htmlFor={id}>
                                        <Field orientation="horizontal">
                                             <FieldContent>
                                                  <FieldTitle>{t(`patterns.${id as BreathingPatternId}`)}</FieldTitle>
                                             </FieldContent>
                                             <RadioGroupItem value={id} id={id} aria-invalid={fieldState.invalid}/>
                                        </Field>
                                   </FieldLabel>
                              ))}
                              {fieldState.invalid && (
                                   <FieldError errors={[fieldState.error]} />
                              )}
                         </RadioGroup>
                    )}
               />
          </Field>
     )
}