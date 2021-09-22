import { StorageAnime } from "../types";

export const addAnimeToStorage = ({ id, cover_image, viewedAt, titles }: StorageAnime) => {
  const existing = localStorage.getItem("anispace-history") ? JSON.parse(String(localStorage.getItem("anispace-history"))) : {};
  if (!existing[id]) existing[id] = {};
  existing[id].titles = titles;
  existing[id].viewedAt = viewedAt;
  existing[id].cover_image = cover_image;
  localStorage.setItem("anispace-history", JSON.stringify(existing));
};

export const addEpisodeToStorage = (animeId: string, episodeId: string) => {
  const existing = localStorage.getItem("anispace-history") ? JSON.parse(String(localStorage.getItem("anispace-history"))) : {};
  existing[animeId].lastEpisode = episodeId;
  localStorage.setItem("anispace-history", JSON.stringify(existing));
};

export const getAnimeStorage = () => {
  const existing = localStorage.getItem("anispace-history") ? JSON.parse(String(localStorage.getItem("anispace-history"))) : {};
  return Object.keys(existing)
    .map((i) => ({ ...existing[i], id: i }))
    .sort((a, b) => b.viewedAt - a.viewedAt);
};

export const getEpisodeStorage = (animeId: string) => {
  const existing = localStorage.getItem("anispace-history") ? JSON.parse(String(localStorage.getItem("anispace-history"))) : {};
  return existing[animeId]?.lastEpisode;
};
