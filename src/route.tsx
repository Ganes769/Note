import { createRootRoute, createRoute } from "@tanstack/react-router";
import Homepage from "./pages/Homepage";
import NewNote from "./pages/NewNote";
import NoteDetail from "./pages/NoteDetailPage";
const rootRoute = createRootRoute();
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
});
const newRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/new",
  component: NewNote,
});
const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "edit",
  component: () => <div>edit</div>,
});
const editnoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/edit/$id",
  component: NewNote,
});
const notedetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/note/$id",
  component: NoteDetail,
});
export const routeTree = rootRoute.addChildren([
  indexRoute,
  newRoute,
  notedetailRoute,
  editRoute,
  editnoteRoute,
]);
