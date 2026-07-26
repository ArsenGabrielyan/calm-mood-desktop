"use client"
import { Controller, UseFormReturn } from "react-hook-form"
import { PomodoroType } from "@/lib/types/pomodoro";
import { Field, FieldError, FieldLabel, FieldGroup } from "../../ui/field";
import { Input } from "../../ui/input";
import { useTranslation } from "react-i18next";
import { usePomodoro } from "@/context/pomodoro";

interface PomodoroCustomInputProps{
     form: UseFormReturn<PomodoroType>
}
export default function PomodoroCustomInput({form}: PomodoroCustomInputProps){
     const {t} = useTranslation("pomodoro")
     const {setSelectedPreset} = usePomodoro()
     return (
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
     )
}