import { Outlet } from "react-router";
import { Suspense } from "react";
import SplashScreen from "@/loaders/splash";

const LazyLayout = () => (
     <Suspense fallback={<SplashScreen/>}>
          <Outlet />
     </Suspense>
);

export default LazyLayout;