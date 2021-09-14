import { FC, LazyExoticComponent } from "react";

export interface Route {
  name: string;
  path: string;
  component: LazyExoticComponent<FC>;
}

export interface Anime {
  titles?: {
    en?: string;
    jp?: string;
    it?: string;
  };
  descriptions?: {
    en?: string;
    jp?: string;
    it?: string;
  };
  trailer_url: string;
  cover_image: string;
  banner_image: string;
  genres?: string[];
  id: number;
  episodes_count: number;
}

export interface AnimeList {
  current_page: number;
  count: number;
  last_page: number;
  documents: Anime[];
}

export interface Episode {
  number: number;
  anime_id: number;
  links: { href: string; value: string }[];
  video: string;
  id: number;
}
