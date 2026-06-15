import WindowWrapper from "@/components/window";
import { useTranslation } from "react-i18next";

export default function PomodoroContent(){
     const {t} = useTranslation("pomodoro")
     return (
          <WindowWrapper title={t("title")} variant="pomodoro">
               Hello New Calm World, Goodbye Hellish world!
          </WindowWrapper>
     )
}