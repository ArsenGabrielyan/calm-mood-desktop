import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider storageKey="calm-mood-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
);
