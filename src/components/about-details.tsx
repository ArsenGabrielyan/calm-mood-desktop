import Logo from "@/components/logo";
import { cache, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {getIdentifier, getTauriVersion, getVersion} from "@tauri-apps/api/app"
import { Skeleton } from "@/components/ui/skeleton";

const getVersions = cache(async() => {
     const [version, tauri, identifier] = await Promise.all([
          getVersion(),
          getTauriVersion(),
          getIdentifier()
     ])
     return {version, tauri, identifier}
})

export default function AboutDetails(){
     const {t} = useTranslation("about");
     const {t: mainTxt} = useTranslation()
     const [details, setDetails] = useState<{
               version: string |  null,
               tauri: string | null,
               identifier: string | null
          }>(()=>{
          const details = localStorage.getItem("calm-mood-details");
          return details ? JSON.parse(details) : {
               version: null,
               tauri: null,
               identifier: null
          }
     })
     useEffect(()=>{
          const fetchVersion = async() => {
               const fetched = await getVersions()
               setDetails(fetched);
               localStorage.setItem("calm-mood-details",JSON.stringify(details))
          }
          fetchVersion()
     },[])
     const year = new Date().getFullYear()
     const translatedBy = useMemo(()=>t("translated-by"),[t])
     return (
          <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col gap-2 max-w-100">
               <Logo width={480} height={163}/>
               {details.version ? (
                    <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-4xl font-sans">{t("version", {version: details.version})}</h2>
               ) : (
                    <Skeleton className="h-5 md:h-6 lg:h-8 xl:h-9 w-3/4"/>
               )}
               <p className="text-sm">{t("about-text")}</p>
               {details.tauri ? (
                    <p className="text-sm text-muted-foreground">{t("tauri-version",{version: details.tauri})}</p>
               ) : (
                    <Skeleton className="h-4 w-1/3"/>
               )}
               {details.identifier ? (
                    <p className="text-sm text-muted-foreground">{t("identifier",{value: details.identifier})}</p>
               ) : (
                    <Skeleton className="h-4 w-1/3"/>
               )}
               <div className="flex items-center justify-between gap-2 w-full">
                    <p className="text-xs text-muted-foreground">{t("copyright")} &copy; {year} {mainTxt("author")}</p>
                    {translatedBy && (
                         <p className="text-xs">{translatedBy}</p>
                    )}
               </div>
          </div>
     )
}