import Logo from "@/components/logo";
import WindowWrapper from "@/components/window";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {getTauriVersion, getVersion} from "@tauri-apps/api/app"
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { openUrl } from "@tauri-apps/plugin-opener";
import { Globe, Grid2X2Plus, MessageCircleWarning } from "lucide-react";

export default function AboutContent(){
     const {t} = useTranslation("about");
     const {t: mainTxt} = useTranslation()
     const [version, setVersion] = useState<string|null>(()=>localStorage.getItem("calm-mood-version"))
     const [tauriVersion, setTauriVersion] = useState<string|null>(()=>localStorage.getItem("calm-mood-tauri-version"))
     useEffect(()=>{
          const fetchVersion = async() => {
               const [app,tauri] = await Promise.all([
                    getVersion(),
                    getTauriVersion()
               ])
               setVersion(app);
               localStorage.setItem("calm-mood-version",app)
               setTauriVersion(tauri)
               localStorage.setItem("calm-mood-tauri-version",tauri)
          }
          fetchVersion()
     },[])
     const year = new Date().getFullYear()
     return (
          <WindowWrapper title={t("title")} className="space-y-1">
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col gap-2 max-w-[400px]">
                    <Logo width={480} height={163}/>
                    {version ? (
                         <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl font-sans">{t("version", {version})}</h2>
                    ) : (
                         <Skeleton className="h-5 md:h-6 lg:h-8 xl:h-9 w-3/4"/>
                    )}
                    <p className="text-sm">{t("about-text")}</p>
                    <p className="text-sm text-muted-foreground">{t("copyright")} &copy; {year} {mainTxt("author")}.</p>
                    {tauriVersion ? (
                         <p className="text-sm text-muted-foreground">Tauri v{tauriVersion}</p>
                    ) : (
                         <Skeleton className="h-4 w-1/3"/>
                    )}
               </div>
               <div className="w-full max-w-[400px] flex items-center justify-center flex-wrap">
                    <Button className="flex-1" onClick={()=>openUrl("https://github.com/ArsenGabrielyan/calm-mood-desktop/issues/new?assignees=&labels=&template=bug_report.md&title=")}>
                         <MessageCircleWarning className="opacity-70"/>
                         {t("bug-report")}
                    </Button>
                    <Button className="flex-1" onClick={()=>openUrl("https://github.com/ArsenGabrielyan/calm-mood-desktop/issues/new?assignees=&labels=&template=feature_request.md&title=")}>
                         <Grid2X2Plus className="opacity-70"/>
                         {t("feature-request")}
                    </Button>
                    <Button className="flex-1" onClick={()=>openUrl("https://calm-mood.vercel.app")}>
                         <Globe className="opacity-70"/>
                         {t("website")}
                    </Button>
               </div>
          </WindowWrapper>
     )
}