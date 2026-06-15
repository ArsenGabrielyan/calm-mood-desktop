"use client"
import { useForm, Controller } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { PomodoroType } from "@/lib/types/pomodoro";
import { getPomodoroSchema } from "@/lib/schemas";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AlarmClock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface Props{
     setOpen: (open: boolean) => void,
}
export default function PomodoroSettings({setOpen}: Props){
     const {t} = useTranslation("pomodoro")
     const form = useForm<PomodoroType>({
          resolver: zodResolver(getPomodoroSchema(t)),
          defaultValues: {
               focus: "30",
               shortBreak: "10",
               longBreak: "25",
               loops: "8"
          }
     })
     const handleSubmit = (values: PomodoroType) => {
          const validatedFields = getPomodoroSchema(t).safeParse(values);
          if(!validatedFields.success) {
               toast.error("Դաշտերը անվավեր են");
               return;
          }
          console.log(validatedFields.data)
          setOpen(false)
     }
     return (
          <form onSubmit={form.handleSubmit(handleSubmit)}>
               <FieldSet className="w-full gap-4">
                    <FieldGroup className="w-full gap-4">
                         <Controller
                              name="focus"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="focus">{t("form.focus-time")}</FieldLabel>
                                        <Input
                                             {...field}
                                             id="focus"
                                             type="number"
                                             min={25}
                                             max={60}
                                             aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Controller
                                   name="longBreak"
                                   control={form.control}
                                   render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor="focus">{t("form.short-break")}</FieldLabel>
                                             <Input
                                                  {...field}
                                                  id="focus"
                                                  type="number"
                                                  min={5}
                                                  max={25}
                                                  aria-invalid={fieldState.invalid}
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
                                             <FieldLabel htmlFor="focus">{t("form.long-break")}</FieldLabel>
                                             <Input
                                                  {...field}
                                                  id="focus"
                                                  type="number"
                                                  min={10}
                                                  max={40}
                                                  aria-invalid={fieldState.invalid}
                                             />
                                             {fieldState.invalid && (
                                                  <FieldError errors={[fieldState.error]} />
                                             )}
                                        </Field>
                                   )}
                              />
                         </div>
                         <Controller
                              name="loops"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                   <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="focus">{t("form.loops")}</FieldLabel>
                                        <Input
                                             {...field}
                                             id="focus"
                                             type="number"
                                             min={2}
                                             max={10}
                                             aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                             <FieldError errors={[fieldState.error]} />
                                        )}
                                   </Field>
                              )}
                         />
                    </FieldGroup>
                    <Field orientation="horizontal">
                         <Button type="submit">
                              <AlarmClock/> {t("form.start")}
                         </Button>
                    </Field>
               </FieldSet>
          </form>
     )
}