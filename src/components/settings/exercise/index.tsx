import { BreathingExerciseType } from "@/lib/types/breathing-exercise"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { getBreathingExerciseSchema } from "@/lib/schemas"
import { Field, FieldGroup, FieldSeparator, FieldSet } from "../../ui/field";
import { Button } from "../../ui/button"
import { lazy, Suspense } from "react"
import { useTranslation } from "react-i18next";
import { useBreathingExercise } from "@/context/breathing-exercise";
import { toast } from "sonner";
import { ExercisePresetsLoader, ExerciseSecondsInputLoader } from "@/loaders/field";

const ExerciseSecondsInput = lazy(()=>import("./seconds-input"));
const ExercisePresets = lazy(()=>import("./preset"));

interface Props{
     setOpen: (open: boolean) => void,
}
export default function ExerciseSettings({setOpen}: Props){
     const {t} = useTranslation("breathing-exercise")
     const {state, applySettings} = useBreathingExercise()
     const form = useForm<BreathingExerciseType>({
          resolver: zodResolver(getBreathingExerciseSchema(t)),
          defaultValues: {
               exerciseTime: Math.round(state.time).toString(),
               pattern: state.pattern
          }
     })
     const onSubmit = (values: BreathingExerciseType) => {
          const validatedFields = getBreathingExerciseSchema(t).safeParse(values);
          if(!validatedFields.success) {
               toast.error(t("validations.invalid-fields"));
               return;
          }
          const {exerciseTime, pattern} = validatedFields.data;
          applySettings({
               exerciseTime,
               pattern
          });
          setOpen(false);
     }
     return (
          <form onSubmit={form.handleSubmit(onSubmit)}>
               <FieldSet>
                    <FieldGroup className="gap-4">
                         <Suspense fallback={(
                              <>
                                   <ExerciseSecondsInputLoader/>
                                   <FieldSeparator/>
                                   <ExercisePresetsLoader/>
                              </>
                         )}>
                              <ExerciseSecondsInput form={form}/>
                              <FieldSeparator/>
                              <ExercisePresets form={form}/>
                         </Suspense>
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