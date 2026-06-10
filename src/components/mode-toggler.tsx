import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "../context/theme-provider"
import { useTranslation } from "react-i18next"

export function ModeToggle() {
  const {resolvedTheme, setTheme} = useTheme()
  const {t} = useTranslation()
  return (
    <Button
      className="shadow-xs text-primary rounded-r-4xl"
      variant="ghost"
      size="icon" title={t("theme")}
      onClick={()=>setTheme(resolvedTheme==="dark" ? "light" : "dark")}
    >
      {resolvedTheme==="dark" ? (
        <Sun className="size-5 opacity-85" />
      ) : (
        <Moon className="size-5 opacity-85" />
      )}
    </Button>
  )
}