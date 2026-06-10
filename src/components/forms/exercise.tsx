import { BreathingExerciseType, BreathingPatternId } from "@/lib/types/breathing-exercise"
import { useForm, Controller } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { getBreathingExerciseSchema } from "@/lib/schemas"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button"
import { useMemo } from "react"
import { BREATHING_PATTERNS } from "@/lib/constants/maps";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { PRESETS } from "@/lib/constants";
import { useTranslation } from "react-i18next";

interface Props{
     onSubmit: (values: BreathingExerciseType) => void,
     setOpen: (open: boolean) => void,
     defaultValue: {
          time: number,
          pattern: BreathingPatternId
     },
}

export default function ExerciseSettings({onSubmit, setOpen, defaultValue}: Props){
     const {t} = useTranslation("breathing-exercise")
     const form = useForm<BreathingExerciseType>({
          resolver: zodResolver(getBreathingExerciseSchema(t)),
          defaultValues: {
               exerciseTime: Math.round(defaultValue.time).toString(),
               pattern: defaultValue.pattern
          }
     })
     const cycleMs = Number(form.watch("exerciseTime")) * 1000;
     const holdTime = useMemo(()=>cycleMs/5, [cycleMs]);
     const growTime = holdTime * 2;
     return (
          <form onSubmit={form.handleSubmit(onSubmit)}>
               <FieldSet>
                    <FieldGroup className="gap-4">
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
                              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                                   {PRESETS.map(({id, Icon, seconds})=>(
                                        <Button variant={Number(form.watch("exerciseTime"))===seconds ? "default" : "outline"} key={id} onClick={()=>form.setValue("exerciseTime",seconds.toString())} type="button">
                                             <Icon className="size-5" />
                                             {t("settings.seconds",{seconds})}
                                        </Button>
                                   ))}
                              </div>
                         </Field>
                         <FieldSeparator/>
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
                    </FieldGroup>
                    <Field orientation="horizontal">
                         <Button type="submit">{t("settings.apply")}</Button>
                         <Button variant="outline" type="button" onClick={()=>{
                              form.reset();
                              setOpen(false);
                         }}>
                              {t("settings.cancel")}
                         </Button>
                    </Field>
               </FieldSet>
          </form>
     )
}