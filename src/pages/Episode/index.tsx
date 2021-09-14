import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getEpisodeData } from "../../api";

import { Player, Video, DefaultUi } from "@vime/react";
import "@vime/core/themes/default.css";

const Episode: FC = () => {
  const { id, episode } = useParams<{ id: string; episode: string }>();

  const { data, error, isLoading } = useQuery(`episode-${id}-${episode}`, () => getEpisodeData(id, episode));

  const [currentQuality, setCurrentQuality] = useState("");

  useEffect(() => {
    setCurrentQuality(data?.links.slice(-1)[0].value || "");
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-2xl">
        <Player>
          <Video>
            <source data-src={data?.links.find((e) => e.value === currentQuality)?.href} type="video/mp4" />
          </Video>

          <DefaultUi />
        </Player>
        <h1 className="mt-6 ml-2">Video Quality</h1>
        <div className="flex gap-2 flex-wrap">
          {data?.links?.map((e) => (
            <button key={e.href} className={`text-white transition py-2 px-4 rounded-md outline-none${e.value === currentQuality ? " bg-blue-sky hover:bg-blue-700" : " bg-dark-lighten hover:bg-dark-darken"}`} onClick={() => setCurrentQuality(e.value)}>
              {e.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Episode;
