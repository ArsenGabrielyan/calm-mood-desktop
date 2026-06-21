import { Cog } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import PopupComponent from "./popup";
import { lazy, Suspense, useState } from "react";
import { ExerciseSettingsLoader, PomodoroSettingsLoader } from "@/loaders/settings";

const ExerciseSettings = lazy(()=>import("./exercise"))
const PomodoroSettings = lazy(()=>import("./pomodoro"))

interface SettingsButtonProps{
     variant?: "breathing-exercise" | "pomodoro"
}
export default function SettingsButton({variant}: SettingsButtonProps){
     const {t} = useTranslation()
     const [open, setOpen] = useState(false)
     const button = (
          <Button 
               className="shadow-xs text-primary rounded-l-4xl"
               variant="ghost"
               size="icon" title={t("buttons.settings")}
          >
               <Cog className="size-5"/>
          </Button>
     )
     if (variant==="breathing-exercise") return (
          <PopupComponent
               trigger={button}
               title={t("buttons.settings")}
               open={open} onOpen={setOpen}
          >
               <Suspense fallback={<ExerciseSettingsLoader/>}>
                    <ExerciseSettings setOpen={setOpen}/>
               </Suspense>
          </PopupComponent>
     )
     if(variant==="pomodoro") return (
          <PopupComponent
               trigger={button}
               title={t("buttons.settings")}
               open={open} onOpen={setOpen}
          >
               <Suspense fallback={<PomodoroSettingsLoader/>}>
                    <PomodoroSettings setOpen={setOpen}/>
               </Suspense>
          </PopupComponent>
     )
     return null
}