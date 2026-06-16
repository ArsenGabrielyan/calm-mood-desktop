import SoundsPageLoader from "@/loaders/sounds";
import { lazy, Suspense } from "react";

const SoundsContent = lazy(()=>import("@/contents/sounds"));

export default function SoundsPage(){
     return (
          <Suspense fallback={<SoundsPageLoader/>}>
               <SoundsContent/>
          </Suspense>
     )
}