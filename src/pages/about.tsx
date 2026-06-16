import AboutLoader from "@/loaders/about";
import { lazy, Suspense } from "react";

const AboutContent = lazy(()=>import("@/contents/about"))

export default function AboutPage(){
     return (
          <Suspense fallback={<AboutLoader/>}>
               <AboutContent/>
          </Suspense>
     )
}