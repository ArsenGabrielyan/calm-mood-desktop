"use client"
import { PomodoroPresetId } from "@/lib/types/pomodoro";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import { useTranslation } from "react-i18next";
import { usePomodoro } from "@/context/pomodoro";
import { POMODORO_PRESETS } from "@/lib/constants/maps";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function PomodoroPresets(){
     const {t} = useTranslation("pomodoro")
     const {selectedPreset, setSelectedPreset} = usePomodoro()
     return (
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
     )
}