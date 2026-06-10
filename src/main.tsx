import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/theme-provider";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import "./App.css";
import "@/i18n"
import SoundProvider from "./context/sounds";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SoundProvider>
      <ThemeProvider storageKey="calm-mood-theme">
        <RouterProvider router={router}/>
      </ThemeProvider>
    </SoundProvider>
  </React.StrictMode>,
);
