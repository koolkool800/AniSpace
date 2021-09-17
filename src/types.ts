import { FC, LazyExoticComponent } from "react";

export interface Route {
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
  last_page: number;
  documents: Anime[];
}

export interface Episode {
  number: number;
  anime_id: number;
  episodes_count: number;
  links: { href: string; value: string }[];
  titles?: {
    en?: string;
    jp?: string;
    it?: string;
  };
  video: string;
  id: number;
}

export interface StorageAnime {
  titles?: {
    en?: string;
    jp?: string;
    it?: string;
  };
  cover_image?: string;
  id: string;
  viewedAt?: number;
}
