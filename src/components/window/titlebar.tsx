import { Copy, Minus, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { Skeleton } from "../ui/skeleton";

const LogoDropdown = lazy(()=>import("./logo-dropdown"))

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
     return (
          <div className="flex items-center justify-between gap-2 bg-linear-to-b from-secondary to-transparent text-foreground pl-2 fixed top-0 left-0 z-30 w-full h-10 backdrop-blur-xs">
               <Suspense fallback={<Skeleton className="size-[30px]"/>}>
                    <LogoDropdown/>
               </Suspense>
               <div className="flex-1 h-full flex items-center ml-1 select-none text-xs sm:text-sm md:text-base">
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