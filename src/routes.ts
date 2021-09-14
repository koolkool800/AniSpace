import { lazy } from "react";

import { Route } from "./types";

const Home = lazy(() => import("./pages/Home"));
const Anime = lazy(() => import("./pages/Anime"));
const Episode = lazy(() => import("./pages/Episode"));

export const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Anime",
    path: "/anime/:id",
    component: Anime,
  },
  {
    name: "Anime Episode",
    path: "/anime/:id/:episode",
    component: Episode,
  },
];
