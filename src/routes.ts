import { lazy } from "react";

import { Route } from "./types";

const Home = lazy(() => import("./pages/Home"));
const Anime = lazy(() => import("./pages/Anime"));

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
];
