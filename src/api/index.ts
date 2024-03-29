import { Anime, AnimeList, Episode } from "../types";
import axios from "./axios";
import { PROXY_URL, API_URL } from "../utils/constants";
import * as cheerio from "cheerio";

const switchToProxy = async <T>(pathname: string): Promise<T> => {
  let response;
  try {
    response = (await axios.get(pathname)).data;
  } catch (error) {
    console.log(error);
    const url = `${API_URL}${pathname}`;
    const response = (await axios.get(`${PROXY_URL}?url=${encodeURIComponent(url)}`)).data;
    if (response.status_code !== 200) throw response.status_code;
    return response.data;
  }

  if (response.status_code !== 200) throw response.status_code;
  return response.data;
};

export const getAnimeList = async (page: number): Promise<AnimeList> => {
  const pathname = `anime?sort_fields=score&sort_directions=-1&per_page=50&page=${page}`;
  const data = await switchToProxy<AnimeList>(pathname);
  return data;
};

export const searchAnime = async (page: number, q: string): Promise<AnimeList> => {
  const pathname = `anime?per_page=50&page=${page}&title=${encodeURIComponent(q)}`;
  try {
    const data = await switchToProxy<AnimeList>(pathname);

    return data;
  } catch (error) {
    return {
      current_page: 1,
      last_page: 1,
      documents: [],
    };
  }
};

export const getAnimeDetail = async (id: string): Promise<Anime> => {
  const pathname = `anime/${id}`;
  const data = await switchToProxy<Anime>(pathname);

  const episodesPathname = `episode?locale=en&source=gogoanime&anime_id=${id}`;

  try {
    const episodes = await switchToProxy<any>(episodesPathname);
    return { ...data, episodes_count: episodes.count };
  } catch (error) {
    console.log(error);
    return { ...data, episodes_count: 0 };
  }
};

export const getEpisodeData = async (animeId: string, episodeId: string): Promise<Episode> => {
  const { titles, episodes_count } = await getAnimeDetail(animeId);

  const episodePathname = `episode?locale=en&source=gogoanime&anime_id=${animeId}&number=${episodeId}`;
  const data = await switchToProxy<{ documents: Episode[] }>(episodePathname);

  const episode = data.documents[0];

  const video = decodeURIComponent(new URL(episode.video).pathname.replace("/v1/proxy/", "")).replace("streaming.php", "download");

  const source = (await axios.get(`${PROXY_URL}?url=${encodeURIComponent(video)}`)).data;

  const $ = cheerio.load(source);

  const links = $(".mirror_link")
    .first()
    .find(".dowload a")
    .map(function () {
      return { href: String($(this).attr("href")), value: $(this).text().replace("Download", "").replace("(", "").replace(")", "").replace("mp4", "").replace("-", "").trim() };
    })
    .toArray();

  return { ...episode, video, links, episodes_count, titles };
};
