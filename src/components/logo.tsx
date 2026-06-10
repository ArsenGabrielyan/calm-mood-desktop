import { useMemo } from "react";
import { useTheme } from "../context/theme-provider";
import { useTranslation } from "react-i18next";

interface Props{
     width: number,
     height: number,
}
export default function Logo({width, height}: Props){
     const {theme} = useTheme()
     const {t} = useTranslation()
     const logoImage = useMemo(() => {
          return theme === "light" ? t("logo.green") : t("logo.lime");
     }, [theme]);
     return (
          <img
               src={logoImage}
               alt="Calm Mood"
               width={width}
               height={height}
               className="object-contain"
          />
     )
}