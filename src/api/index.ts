import { Anime, AnimeList } from "../types";
import axios from "./axios";
import { PROXY_URL, API_URL } from "../constants";

const switchToProxy = async <T>(pathname: string): Promise<T> => {
  try {
    const data = (await axios.get(pathname)).data.data;
    return data;
  } catch (error) {
    console.log(error);
    const url = `${API_URL}${pathname}`;
    const data = (await axios.get(`${PROXY_URL}?url=${encodeURIComponent(url)}`)).data.data;
    return data;
  }
};

export const getAnimeList = async (page: number): Promise<AnimeList> => {
  const pathname = `anime?per_page=50&page=${page}`;
  const data = await switchToProxy<AnimeList>(pathname);
  return data;
};

export const getAnimeDetail = async (id: string): Promise<Anime> => {
  const pathname = `anime/${id}`;
  const data = await switchToProxy<Anime>(pathname);

  const episodesPathname = `episode?locale=en&source=gogoanime&anime_id=${id}`;
  const episodes = await switchToProxy<any>(episodesPathname);
  if (!episodes) {
    return { ...data, episodes_count: 0 };
  }

  return { ...data, episodes_count: episodes.count };
};
