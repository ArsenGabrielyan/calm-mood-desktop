import { cn } from "@/lib/utils";
import ActionButtonsLoader from "./actions-button";
import TitlebarLoader from "./titlebar";


interface WindowWrapperLoaderProps{
     children: React.ReactNode,
     className?: string,
     noVariant?: boolean
}
export default function WindowWrapperLoader({
     children,
     className,
     noVariant=false
}: WindowWrapperLoaderProps){
     return (
          <main className="w-full h-full relative">
               <TitlebarLoader/>
               <main className="relative w-full min-h-dvh flex bg-accent-foreground justify-center items-center flex-col gap-2.5">
                    <div className="absolute inset-0 bg-linear-to-b from-background/50 to-background/65 -z-00"/>
                    <div className={cn("relative z-10 text-foreground p-4 w-full flex justify-center items-center flex-col", className)}>
                         {children}
                    </div>
               </main>
               <ActionButtonsLoader noVariant={noVariant}/>
          </main>
     )
}