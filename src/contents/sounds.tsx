import WindowWrapper from "@/components/window";
import { useTranslation } from "react-i18next";
import { sounds } from "@/lib/sounds";
import { lazy, Suspense } from "react";
import { SoundCardLoader } from "@/loaders/sounds";

const SoundCard = lazy(()=>import("@/components/sound-card"));

export default function SoundsContent(){
     const {t} = useTranslation("sounds")
     return (
          <WindowWrapper title={t("title")} className="mt-8 mb-12 flex justify-center items-center flex-col gap-2 w-full">
               <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1.5">
                    {sounds.map(sound=>(
                         <Suspense key={sound.id} fallback={<SoundCardLoader/>}>
                              <SoundCard data={sound}/>
                         </Suspense>
                    ))}
               </div>
          </WindowWrapper>
     )
}