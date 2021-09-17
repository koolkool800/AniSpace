import { StorageAnime } from "../types";

export const addToStorage = ({ id, cover_image, viewedAt, titles }: StorageAnime) => {
  const existing = localStorage.getItem("anispace-history") ? JSON.parse(String(localStorage.getItem("anispace-history"))) : {};
  existing[id] = {
    titles,
    viewedAt,
    cover_image,
  };
  localStorage.setItem("anispace-history", JSON.stringify(existing));
};

export const getStorage = () => {
  const existing: any = localStorage.getItem("anispace-history") ? JSON.parse(String(localStorage.getItem("anispace-history"))) : {};
  return Object.keys(existing)
    .map((i) => ({ ...existing[i], id: i }))
    .sort((a, b) => b.viewedAt - a.viewedAt);
};
