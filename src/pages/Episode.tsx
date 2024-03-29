import { FC, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getEpisodeData } from "../api";

import Skeleton from "../components/Skeleton";

import { anchorDownloadFile } from "../utils";
import { addEpisodeToStorage } from "../utils/localStorage";

import { Player, Video, DefaultUi, DefaultControls } from "@vime/react";
import "@vime/core/themes/default.css";
import WentWrong from "../components/WentWrong";

const Episode: FC = () => {
  const { id, episode } = useParams<{ id: string; episode: string }>();

  const { data, error, isLoading } = useQuery(`episode-${id}-${episode}`, () => getEpisodeData(id, episode));

  const [currentQuality, setCurrentQuality] = useState("");

  const [expandEpisodes, setExpandEpisodes] = useState(false);

  useEffect(() => {
    setCurrentQuality(data?.links[0].value || "");
  }, [data]);

  useEffect(() => {
    addEpisodeToStorage(id, episode);
  }, [data, episode, id]);

  if (isLoading)
    return (
      <div className="flex justify-center mt-8 mx-two-percent">
        <div className="w-full max-w-2xl">
          <Skeleton className="w-96 h-7 my-4 rounded" />
          <Skeleton className="w-full h-0" style={{ paddingBottom: "56.25%" }} />
          <Skeleton className="w-56 h-7 my-4 rounded" />
          <div className="flex gap-2 flex-wrap mb-5">
            {new Array(10).fill("").map((_, i) => (
              <Skeleton key={i} className="w-14 h-9 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  if (error) return <WentWrong />;

  return (
    <div className="flex justify-center mx-two-percent pb-8">
      <div className="w-full max-w-2xl">
        <h1 className="my-4 ml-2 text-2xl">
          <Link className="text-blue-sky" to={`/anime/${id}`}>
            {data?.titles?.en || data?.titles?.jp || data?.titles?.it || "Unknown title"}
          </Link>{" "}
          <span>Episode {episode}</span>
        </h1>
        <Player playsinline controls={false}>
          <Video>
            <source data-src={data?.links.find((e) => e.value === currentQuality)?.href} type="video/mp4" />
          </Video>
          <DefaultUi noControls>
            <DefaultControls hideOnMouseLeave />
          </DefaultUi>
        </Player>
        <h1 className="my-4 ml-2">Video Quality</h1>
        <div className="flex gap-2 flex-wrap">
          {data?.links?.map((e) => (
            <button key={e.href} className={`text-white transition py-2 px-4 rounded-md outline-none${e.value === currentQuality ? " bg-blue-sky hover:bg-blue-700" : " bg-dark-lighten hover:bg-dark-darken"}`} onClick={() => setCurrentQuality(e.value)}>
              {e.value}
            </button>
          ))}
        </div>

        <h1 className="my-4 ml-2">Download video</h1>
        <div className="flex gap-2 flex-wrap">
          {data?.links?.map((e) => (
            <button key={e.href} className="text-white transition py-2 px-4 rounded-md outline-none  bg-dark-lighten hover:bg-dark-darken" onClick={() => anchorDownloadFile(e.href)}>
              {e.value}
            </button>
          ))}
        </div>

        <h1 className="my-4 ml-2">Episodes</h1>
        <div className={`overflow-hidden ${!expandEpisodes ? "max-h-36 darken-to-bottom" : "max-h-infinity"}`}>
          <div className="flex gap-2 flex-wrap mb-5 justify-between fill-last-item">
            {new Array(data?.episodes_count).fill("").map((_, index) => (
              <Link to={`/anime/${id}/${index + 1}`} key={index + 1} className={`text-white transition py-2 px-4 rounded-md outline-none${index + 1 === Number(episode) ? " bg-blue-sky hover:bg-blue-700" : " bg-dark-lighten hover:bg-dark-darken"}`}>
                {index + 1}
              </Link>
            ))}
          </div>
        </div>
        <span onClick={() => setExpandEpisodes((prev) => !prev)} className="text-blue-400 hover:text-blue-500 transition cursor-pointer ml-2 mt-2">
          {expandEpisodes ? "Hide" : "Expand"}
        </span>
      </div>
    </div>
  );
};

export default Episode;
