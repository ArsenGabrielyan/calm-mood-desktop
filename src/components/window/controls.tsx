import { Copy, Minus, Square, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState, useEffect, useMemo } from "react";

export default function WindowControl(){
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
          <div className="flex items-center">
               <Button className="rounded-none" size="icon" variant="ghost" title="Minimize" onClick={handleMinimize}><Minus/></Button>
               <Button className="rounded-none" size="icon" variant="ghost" title={isMaximized ? "Restore Down" : "Maximize"} onClick={handleToggleMaximize}>
                    {isMaximized ? <Copy/> : <Square/>}
               </Button>
               <Button className="rounded-none" size="icon" variant="ghost-destructive" title="Close" onClick={handleClose}><X/></Button>
          </div>
     )
}