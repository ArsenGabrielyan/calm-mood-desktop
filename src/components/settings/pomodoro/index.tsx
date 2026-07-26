"use client"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { PomodoroType } from "@/lib/types/pomodoro";
import { getPomodoroSchema } from "@/lib/schemas";
import { Field, FieldSeparator, FieldSet } from "../../ui/field";
import { Button } from "../../ui/button";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { usePomodoro } from "@/context/pomodoro";
import { POMODORO_PRESETS } from "@/lib/constants/maps";
import { lazy, Suspense, useEffect } from "react";
import { PomodoroPresetsLoader } from "@/loaders/field";
import { PomodoroCustomInputLoader } from "@/loaders/field";

const PomodoroPresets = lazy(()=>import("./preset"));
const PomodoroCustomInput = lazy(()=>import("./custom-input"))

interface Props{
     setOpen: (open: boolean) => void,
}
export default function PomodoroSettings({setOpen}: Props){
     const {t} = useTranslation("pomodoro")
     const {apply, state, selectedPreset, start} = usePomodoro()
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
                    <Suspense fallback={(
                         <>
                         <PomodoroCustomInputLoader/>
                         <FieldSeparator/>
                         <PomodoroPresetsLoader/>
                         </>
                    )}>
                         <PomodoroCustomInput form={form}/>
                         <FieldSeparator/>
                         <PomodoroPresets/>
                    </Suspense>
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