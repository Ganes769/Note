import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./route";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { NoteProvider } from "./NoteProvider/NoteContext";
import { Toaster } from "react-hot-toast";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NoteProvider>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </NoteProvider>
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
