import { Anime, AnimeList } from "../types";
import axios from "./axios";

export const getAnimeList = async (page: number): Promise<AnimeList> => {
  return (await axios.get(`anime?per_page=20&page=${page}`)).data.data;
};

export const getAnimeDetail = async (id: string): Promise<Anime> => {
  return (await axios.get(`anime/${id}`)).data.data;
};
