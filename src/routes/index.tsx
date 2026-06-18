import { createBrowserRouter } from "react-router";
import LazyLayout from "./layout";
import { lazy } from "react";

const BreathingExercisePage = lazy(()=>import("../pages/exercise"))
const SoundsPage = lazy(()=>import("../pages/sounds"))
const PomodoroPage = lazy(()=>import("../pages/pomodoro"))
const AboutPage = lazy(()=>import("../pages/about"))
const UpdatesPage = lazy(()=>import("../pages/update"))

export const router = createBrowserRouter([
     {
          element: <LazyLayout />,
          children: [
               { path: "/", element: <BreathingExercisePage/>, index: true },
               { path: "/sounds", element: <SoundsPage/> },
               { path: "/pomodoro", element: <PomodoroPage/> },
               { path: "/about", element: <AboutPage/> },
               { path: "/update", element: <UpdatesPage/> }
          ]
     }
]);