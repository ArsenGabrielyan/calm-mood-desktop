import WindowWrapper from "@/components/window";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { openUrl } from "@tauri-apps/plugin-opener";
import { Globe, Grid2X2Plus, MessageCircleWarning } from "lucide-react";
import { AboutDetailsLoader } from "@/loaders/about";

const AboutDetails = lazy(()=>import("@/components/about-details"));

export default function AboutContent(){
     const {t} = useTranslation("about");
     return (
          <WindowWrapper title={t("title")} className="space-y-1">
               <Suspense fallback={<AboutDetailsLoader/>}>
                    <AboutDetails/>
               </Suspense>
               <div className="w-full max-w-100 flex items-center justify-center flex-wrap">
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