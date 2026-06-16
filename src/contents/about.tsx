import Logo from "@/components/logo";
import WindowWrapper from "@/components/window";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {getVersion} from "@tauri-apps/api/app"

export default function AboutContent(){
     const {t} = useTranslation("about");
     const [version, setVersion] = useState<string|null>(()=>localStorage.getItem("calm-mood-version"))
     useEffect(()=>{
          const fetchVersion = async() => {
               const ver = await getVersion()
               setVersion(ver);
               localStorage.setItem("calm-mood-version",ver)
          }
          fetchVersion()
     },[])
     return (
          <WindowWrapper title={t("title")}>
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col gap-2 max-w-[400px] relative group">
                    <Logo width={480} height={163}/>
                    {version && <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl font-sans">{t("version", {version})}</h2>}
                    Hello New Calm World, Goodbye Hellish world!
               </div>
          </WindowWrapper>
     )
}