import { lazy } from "react";

import { Route } from "./types";

const Home = lazy(() => import("./pages/Home"));
const Anime = lazy(() => import("./pages/Anime"));
const Episode = lazy(() => import("./pages/Episode"));
const Search = lazy(() => import("./pages/Search"));

export const routes: Route[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/anime/:id",
    component: Anime,
  },
  {
    path: "/anime/:id/:episode",
    component: Episode,
  },
  {
    path: "/search",
    component: Search,
  },
];
