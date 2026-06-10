import { BookOpen, Code, Grid2X2Plus, Info, MessageCircleWarning } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SiGithub } from "react-icons/si"
import { Copy, Minus, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface TitleBarProps{
     title?: string,
}
export default function TitleBar({title}: TitleBarProps){
     const appWindow = useMemo(()=>getCurrentWindow(),[])
     const [isMaximized, setIsMaximized] = useState(false)
     const handleClose = async () => await appWindow.close();
     const handleToggleMaximize = async () => {
          await appWindow.toggleMaximize();
          setIsMaximized(await appWindow.isMaximized())
     }
     const handleMinimize = async () => await appWindow.minimize()
     useEffect(() => {
          let unlisten: (() => void) | undefined;
          const setup = async () => {
               const syncState = async () => {
                    setIsMaximized(await appWindow.isMaximized());
               };
               await syncState();
               unlisten = await appWindow.onResized(syncState);
          };
          setup();
          return () => {
               if (unlisten) unlisten();
          };
     }, [appWindow])
     const {t} = useTranslation()
     return (
          <div className="flex items-center justify-between gap-2 bg-linear-to-b from-secondary to-transparent text-foreground pl-2 fixed top-0 left-0 z-30 w-full h-10 backdrop-blur-xs">
               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <img src="/app-icon.png" alt={t("appName")} width={30} height={30} className="select-none rounded-xs cursor-pointer"/> 
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full min-w-32 bg-popover/60 backdrop-blur-sm border-0 shadow-xs">
                         <DropdownMenuLabel>{t("appName")}</DropdownMenuLabel>
                         <DropdownMenuSeparator/>
                         <DropdownMenuItem>
                              <Info className="text-muted-foreground opacity-70"/>
                              Այս հավելվածի մասին
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                              <SiGithub className="text-muted-foreground opacity-70"/>
                              Դիտել GitHub-ում
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                              <BookOpen className="text-muted-foreground opacity-70"/>
                              Ձեռնարկ
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                              <Code className="text-muted-foreground opacity-70"/>
                              Մասնակցել
                         </DropdownMenuItem>
                         <DropdownMenuSeparator/>
                         <DropdownMenuItem>
                              <MessageCircleWarning className="text-muted-foreground opacity-70"/>
                              Հաղորդել սխալի մասին
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                              <Grid2X2Plus className="text-muted-foreground opacity-70"/>
                              Խնդրել նոր գործառույթ
                         </DropdownMenuItem>
                    </DropdownMenuContent>
               </DropdownMenu>
               <div className="flex-1 h-full flex items-center ml-1 select-none text-base">
                    <div data-tauri-drag-region className="w-full h-full flex items-center">
                         {title}
                    </div>
               </div>
               <div className="flex items-center">
                    <Button className="rounded-none" size="icon" variant="ghost" title="Minimize" onClick={handleMinimize}><Minus/></Button>
                    <Button className="rounded-none" size="icon" variant="ghost" title={isMaximized ? "Restore Down" : "Maximize"} onClick={handleToggleMaximize}>
                         {isMaximized ? <Copy/> : <Square/>}
                    </Button>
                    <Button className="rounded-none" size="icon" variant="ghost-destructive" title="Close" onClick={handleClose}><X/></Button>
               </div>
          </div>
     )
}