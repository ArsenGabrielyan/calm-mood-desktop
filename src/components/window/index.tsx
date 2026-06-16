import { cn, getDailyBackground } from "@/lib/utils";
import { lazy, Suspense } from "react";
import TitlebarLoader from "@/loaders/titlebar";
import ActionButtonsLoader from "@/loaders/actions-button";

const TitleBar = lazy(()=>import("./titlebar"))
const ActionButtons = lazy(()=>import("./actions"))

export interface WindowWrapperProps{
     children: React.ReactNode,
     title?: string,
     className?: string,
     variant?: "breathing-exercise" | "pomodoro"
}
export default function WindowWrapper({
     children,
     title,
     className,
     variant
}: WindowWrapperProps){
     return (
          <main className="w-full h-full relative">
               <Suspense fallback={<TitlebarLoader/>}>
                    <TitleBar
                         title={title}
                    />
               </Suspense>
               <main className="relative w-full min-h-dvh flex justify-center items-center flex-col gap-2.5" style={getDailyBackground()}>
                    <div className="absolute inset-0 bg-linear-to-b from-background/50 to-background/65 -z-00"/>
                    <div className={cn("relative z-10 text-foreground p-4 w-full md:w-fit flex justify-center items-center flex-col", className)}>
                         {children}
                    </div>
               </main>
               <Suspense fallback={<ActionButtonsLoader noVariant={!variant}/>}>
                    <ActionButtons variant={variant}/>
               </Suspense>
          </main>
     )
}