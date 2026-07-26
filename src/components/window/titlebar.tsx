import { Suspense, lazy } from "react";
import { Skeleton } from "../ui/skeleton";
import { WindowControlLoader } from "@/loaders/titlebar";

const WindowControl = lazy(()=>import("./controls"));
const LogoDropdown = lazy(()=>import("./logo-dropdown"))

interface TitleBarProps{
     title?: string,
}
export default function TitleBar({title}: TitleBarProps){
     return (
          <div className="flex items-center justify-between gap-2 bg-linear-to-b from-secondary to-transparent text-foreground pl-2 fixed top-0 left-0 z-30 w-full h-10 backdrop-blur-xs">
               <Suspense fallback={<Skeleton className="size-7.5"/>}>
                    <LogoDropdown/>
               </Suspense>
               <div className="flex-1 h-full flex items-center ml-1 select-none text-xs sm:text-sm md:text-base">
                    <div data-tauri-drag-region className="w-full h-full flex items-center">
                         {title}
                    </div>
               </div>
               <Suspense fallback={<WindowControlLoader/>}>
                    <WindowControl/>
               </Suspense>
          </div>
     )
}