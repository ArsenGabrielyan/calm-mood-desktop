"use client"
import { useForm, Controller } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { PomodoroPresetId, PomodoroType } from "@/lib/types/pomodoro";
import { getPomodoroSchema } from "@/lib/schemas";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator, FieldSet, FieldTitle } from "../ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { usePomodoro } from "@/context/pomodoro";
import { POMODORO_PRESETS } from "@/lib/constants/maps";
import {  } from "radix-ui";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface Props{
     setOpen: (open: boolean) => void,
}
export default function PomodoroSettings({setOpen}: Props){
     const {t} = useTranslation("pomodoro")
     const {apply, state, selectedPreset, setSelectedPreset, start} = usePomodoro()
     const form = useForm<PomodoroType>({
          resolver: zodResolver(getPomodoroSchema(t)),
          defaultValues: {
               focus: state.focus ?? POMODORO_PRESETS[selectedPreset ?? "balanced"].focus,
               shortBreak: state.shortBreak ?? POMODORO_PRESETS[selectedPreset ?? "balanced"].shortBreak,
               longBreak: state.longBreak ?? POMODORO_PRESETS[selectedPreset ?? "balanced"].longBreak,
               loops: state.loops ?? POMODORO_PRESETS[selectedPreset ?? "balanced"].loops
          }
     })
     const handleApply = (values: PomodoroType) => {
          const validatedFields = getPomodoroSchema(t).safeParse(values);
          if(!validatedFields.success) {
               toast.error(t("validation.invalid-fields"));
               return;
          }
          apply(validatedFields.data)
          setOpen(false)
     }
     const handleStart = (values: PomodoroType) => {
          const validatedFields = getPomodoroSchema(t).safeParse(values);
          if(!validatedFields.success) {
               toast.error(t("validation.invalid-fields"));
               return;
          }
          apply(validatedFields.data)
          start()
          setOpen(false)
     }
     useEffect(() => {
          if (!selectedPreset) return
          const preset = POMODORO_PRESETS[selectedPreset]
          form.reset({
               focus: preset.focus,
               shortBreak: preset.shortBreak,
               longBreak: preset.longBreak,
               loops: preset.loops
          })
     }, [selectedPreset])
     return (
          <form onSubmit={form.handleSubmit(handleStart)}>
               <FieldSet className="w-full gap-4">
                    <FieldGroup className="w-full gap-4">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Controller
                                   name="focus"
                                   control={form.control}
                                   render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("form.focus-time")}</FieldLabel>
                                             <Input
                                                  {...field}
                                                  id={field.name}
                                                  type="number"
                                                  aria-invalid={fieldState.invalid}
                                                  onChange={(e) => {
                                                       field.onChange(e.target.value)
                                                       setSelectedPreset(null)
                                                  }}
                                             />
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                              <Controller
                                   name="loops"
                                   control={form.control}
                                   render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("form.loops")}</FieldLabel>
                                             <Input
                                                  {...field}
                                                  id={field.name}
                                                  type="number"
                                                  aria-invalid={fieldState.invalid}
                                                  onChange={(e) => {
                                                       field.onChange(e.target.value)
                                                       setSelectedPreset(null)
                                                  }}
                                             />
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Controller
                                   name="shortBreak"
                                   control={form.control}
                                   render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("form.short-break")}</FieldLabel>
                                             <Input
                                                  {...field}
                                                  id={field.name}
                                                  type="number"
                                                  aria-invalid={fieldState.invalid}
                                                  onChange={(e) => {
                                                       field.onChange(e.target.value)
                                                       setSelectedPreset(null)
                                                  }}
                                             />
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                              <Controller
                                   name="longBreak"
                                   control={form.control}
                                   render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>{t("form.long-break")}</FieldLabel>
                                             <Input
                                                  {...field}
                                                  id={field.name}
                                                  type="number"
                                                  aria-invalid={fieldState.invalid}
                                                  onChange={(e) => {
                                                       field.onChange(e.target.value)
                                                       setSelectedPreset(null)
                                                  }}
                                             />
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                         </div>
                    </FieldGroup>
                    <FieldSeparator/>
                    <Field>
                         <FieldLabel>{t("presets.title")}</FieldLabel>
                         <RadioGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" value={selectedPreset ?? ""} onValueChange={(val) => setSelectedPreset(val as PomodoroPresetId)}>
                              {Object.entries(POMODORO_PRESETS).map(([id,value])=>(
                                   <FieldLabel key={id} htmlFor={id} className={cn(
                                        "transition",
                                        selectedPreset === id && "border-primary bg-primary/10"
                                   )}>
                                        <Field orientation="horizontal">
                                             <FieldContent>
                                                  <FieldTitle>{t(`presets.${id as PomodoroPresetId}`)}</FieldTitle>
                                                  <FieldDescription>{t("presets.desc-format",{
                                                       count: value.focus,
                                                       loops: value.loops
                                                  })}</FieldDescription>
                                             </FieldContent>
                                             <RadioGroupItem value={id} id={id}/>
                                        </Field>
                                   </FieldLabel>
                              ))}
                         </RadioGroup>
                    </Field>
                    <Field orientation="horizontal">
                         <Button type="submit">
                              {t("start")}
                         </Button>
                         <Button type="button" variant="secondary" onClick={form.handleSubmit(handleApply)}>
                              {t("form.apply")}
                         </Button>
                         <Button variant="ghost" type="button" onClick={()=>{
                              form.reset();
                              setOpen(false);
                         }}>
                              {t("form.cancel")}
                         </Button>
                    </Field>
               </FieldSet>
          </form>
     )
}