import WindowWrapper from "@/components/window";
import { useTranslation } from "react-i18next";

export default function PomodoroPage(){
     const {t} = useTranslation("pomodoro")
     return (
          <WindowWrapper title={t("title")}>
               Hello New Calm World, Goodbye Hellish world!
          </WindowWrapper>
     )
}