import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
  const {resolvedTheme, setTheme} = useTheme()
  return (
    <Button
      className="shadow-xs text-primary rounded-r-4xl"
      variant="ghost"
      size="icon" title="Փոխել ոճը"
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