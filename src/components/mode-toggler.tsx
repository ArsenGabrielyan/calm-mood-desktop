import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "../context/theme-provider"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

interface ModeToggleProps{
  noVariant?: boolean
}
export function ModeToggle({noVariant = true}: ModeToggleProps) {
  const {resolvedTheme, setTheme} = useTheme()
  const {t} = useTranslation()
  return (
    <Button
      className={cn("shadow-xs text-primary rounded-none", noVariant && "rounded-l-4xl")}
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