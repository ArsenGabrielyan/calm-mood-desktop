import { Code, Globe, Grid2X2Plus, Info, MessageCircleWarning, RotateCcw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SiGithub } from "react-icons/si"
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/theme-provider";
import { openUrl } from "@tauri-apps/plugin-opener"
import { Link } from "react-router";

export default function LogoDropdown(){
     const {t} = useTranslation()
     const {resolvedTheme} = useTheme()
     const appIcon = useMemo(()=>resolvedTheme==="dark" ? "/logo-dark-aero.png" : "/logo-aero.png",[resolvedTheme])
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <img src={appIcon} alt={t("appName")} width={30} height={30} className="select-none rounded-xs cursor-pointer"/> 
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-full min-w-32 bg-popover/60 backdrop-blur-sm border-0 shadow-xs">
                    <DropdownMenuLabel>{t("appName")}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild>
                         <Link to="/about">
                              <Info className="text-muted-foreground opacity-70"/>
                              {t("dropdown.about")}
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                         <Link to="/update">
                              <RotateCcw className="text-muted-foreground opacity-70"/>
                              {t("dropdown.check-updates")}
                         </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://calm-mood.vercel.app")}>
                         <Globe className="text-muted-foreground opacity-70"/>
                         {t("dropdown.website")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenGabrielyan/calm-mood-desktop")}>
                         <SiGithub className="text-muted-foreground opacity-70"/>
                         {t("dropdown.github-link")}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenGabrielyan/calm-mood-desktop/blob/main/CONTRIBUTING.md")}>
                         <Code className="text-muted-foreground opacity-70"/>
                         {t("dropdown.contribute")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenGabrielyan/calm-mood-desktop/issues/new?assignees=&labels=&template=bug_report.md&title=")}>
                         <MessageCircleWarning className="text-muted-foreground opacity-70"/>
                         {t("dropdown.bug-report")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>openUrl("https://github.com/ArsenGabrielyan/calm-mood-desktop/issues/new?assignees=&labels=&template=feature_request.md&title=")}>
                         <Grid2X2Plus className="text-muted-foreground opacity-70"/>
                         {t("dropdown.feature-request")}
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}