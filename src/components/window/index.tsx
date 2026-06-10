import { cn, getDailyBackground } from "@/lib/utils";
import { Button } from "../ui/button";
import { Cog, Timer, Waves, Wind } from "lucide-react";
import TitleBar from "./titlebar";
import { Link, useLocation } from "react-router";
import { ModeToggle } from "../mode-toggler";
import { Suspense } from "react";
import TitlebarLoader from "@/loaders/titlebar";
import { useTranslation } from "react-i18next";

interface WindowWrapperProps{
     children: React.ReactNode,
     title?: string,
     className?: string
}
export default function WindowWrapper({
     children,
     title,
     className
}: WindowWrapperProps){
     const {t} = useTranslation()
     const location = useLocation()
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
               <div className="fixed bottom-0 left-0 w-full flex justify-between items-center gap-2 p-4 bg-linear-to-b from-transparent to-secondary backdrop-blur-xs">
                    <div className="bg-card text-card-foreground shadow-xs border-0 rounded-4xl">
                         <Button
                              className="shadow-xs text-primary rounded-l-4xl"
                              variant={location.pathname==="/" ? "secondary" : "ghost"} 
                              size="icon" title={t("buttons.exercise")} asChild
                         >
                              <Link to="/">
                                   <Wind className="size-5"/>
                              </Link>
                         </Button>
                         <Button
                              className="shadow-xs hover:text-primary rounded-none"
                              variant={location.pathname==="/sounds" ? "secondary" : "ghost"}
                              size="icon" title={t("buttons.sounds")} asChild
                         >
                              <Link to="/sounds">
                                   <Waves className="size-5"/>
                              </Link>
                         </Button>
                         <Button
                              className="shadow-xs hover:text-primary rounded-r-4xl"
                              variant={location.pathname==="/pomodoro" ? "secondary" : "ghost"}
                              size="icon" title={t("buttons.pomodoro")} asChild
                         >
                              <Link to="/pomodoro">
                                   <Timer className="size-5"/>
                              </Link>
                         </Button>
                    </div>
                    <div className="bg-card text-card-foreground shadow-xs border-0 rounded-4xl">
                         <Button 
                              className="shadow-xs text-primary rounded-l-4xl"
                              variant="ghost"
                              size="icon" title={t("buttons.settings")}
                         >
                              <Cog className="size-5"/>
                         </Button>
                         <ModeToggle/>
                    </div>
               </div>
          </main>
     )
}