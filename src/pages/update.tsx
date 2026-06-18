import UpdaterLoader from "@/loaders/updater";
import { lazy, Suspense } from "react";

const UpdaterContent = lazy(()=>import("@/contents/updater"));

export default function UpdaterPage(){
     return (
          <Suspense fallback={<UpdaterLoader/>}>
               <UpdaterContent/>
          </Suspense>
     )
}