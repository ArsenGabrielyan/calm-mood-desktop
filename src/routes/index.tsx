import { createBrowserRouter } from "react-router";
import LazyLayout from "./layout";
import { lazy } from "react";

const BreathingExercisePage = lazy(()=>import("../pages/exercise"))
const SoundsPage = lazy(()=>import("../pages/sounds"))
const PomodoroPage = lazy(()=>import("../pages/pomodoro"))

export const router = createBrowserRouter([
     {
          element: <LazyLayout />,
          children: [
               { path: "/", element: <BreathingExercisePage/>, index: true },
               { path: "/sounds", element: <SoundsPage/> },
               { path: "/pomodoro", element: <PomodoroPage/> },
          ]
     }
]);