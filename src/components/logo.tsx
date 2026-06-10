import { useMemo } from "react";
import { useTheme } from "../context/theme-provider";

interface Props{
     width: number,
     height: number,
}
export default function Logo({width, height}: Props){
     const {theme} = useTheme()
     const logoImage = useMemo(() => {
          return theme === "light" ? "/logos/logo-green.webp" : "/logos/logo-lime.webp";
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