import { FC, useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";

import { getAnimeDetail } from "../api";
import PureText from "../components/PureText";

import Play from "../asset/svg/Play";
import Skeleton from "../components/Skeleton";
import WentWrong from "../components/WentWrong";

import { addAnimeToStorage, getEpisodeStorage } from "../utils/localStorage";

const Anime: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error } = useQuery(`anime-${id}`, () => getAnimeDetail(id));

  useEffect(() => {
    addAnimeToStorage({ id, cover_image: data?.cover_image, viewedAt: Date.now(), titles: data?.titles });
  }, [data, id]);

  const recentEpisode = useMemo(() => getEpisodeStorage(id), [id]);

  const [expandDescription, setExpandDescription] = useState(false);
  const [trailerBackdropOpened, setTrailerBackdropOpened] = useState(false);
  const [trailerSkeleton, setTrailerSkeleton] = useState(true);

  if (error) return <WentWrong />;

  return (
    <div className="relative">
      <div className="absolute w-screen h-48 md:h-64 top-0 left-0 background-image z-0 opacity-50" style={{ backgroundImage: data ? `url(${data?.banner_image})` : "" }}>
        {!data && <Skeleton className="w-full h-full" />}
      </div>
      <div className="flex flex-col md:flex-row gap-5 px-one-twenty pt-24 md:pt-48 pb-10 md:items-start">
        <div className="flex justify-center flex-shrink-0">{data ? <img className="z-10 h-auto rounded-md" src={data?.cover_image} alt="" /> : <Skeleton className="rounded-md" style={{ width: 230, height: 325 }} />}</div>
        <div className="z-10 flex-grow">
          {data && (
            <div className="flex gap-3 md:py-3 md:justify-start justify-center md:h-16">
              {data?.episodes_count ? (
                <Link to={`/anime/${id}/1`} className="darken-btn">
                  <Play style={{ height: 30, width: 30 }} />
                  <span>Watch now</span>
                </Link>
              ) : (
                ""
              )}
              {data?.trailer_url && (
                <button onClick={() => setTrailerBackdropOpened(true)} className="darken-btn">
                  <Play style={{ height: 30, width: 30 }} />
                  <span>Watch trailer</span>
                </button>
              )}
              {recentEpisode && recentEpisode !== "1" && (
                <Link to={`/anime/${id}/${recentEpisode}`} className="darken-btn">
                  <Play style={{ height: 30, width: 30 }} />
                  <span>Continue watching episode {recentEpisode}</span>
                </Link>
              )}
            </div>
          )}

          {data ? (
            <>
              <PureText text={data?.titles?.en || data?.titles?.jp || data?.titles?.it || "Unknown title"} className="text-white text-3xl mt-2" />
              {(data?.descriptions?.en || data?.descriptions?.jp || data?.descriptions?.it) && (
                <div>
                  <div className={`text-gray-50 text-base overflow-hidden ${!expandDescription ? "max-h-36 darken-to-bottom" : "max-h-infinity"}`}>
                    <PureText text={data?.descriptions?.en || data?.descriptions?.jp || data?.descriptions?.it || ""} />
                    <PureText text={`Genre: ${data?.genres?.join(", ")}`} />
                  </div>
                  <span onClick={() => setExpandDescription((prev) => !prev)} className="text-blue-400 hover:text-blue-500 transition cursor-pointer">
                    {expandDescription ? "Hide" : "Expand"}
                  </span>
                </div>
              )}
            </>
          ) : (
            new Array(10).fill("").map((_, i) => <Skeleton key={i} className="w-full h-4 my-3 rounded-md" />)
          )}
        </div>
      </div>
      {trailerBackdropOpened && (
        <div
          onClick={() => {
            setTrailerBackdropOpened(false);
            setTrailerSkeleton(true);
          }}
          className={`fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-opacity-60 z-20 bg-dark-darken overflow-hidden`}
        >
          <div className="max-w-md w-full overflow-hidden">
            <div className="relative w-full h-0 overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe onLoad={() => setTrailerSkeleton(false)} className={`absolute w-full h-full top-0 left-0${trailerSkeleton ? " bg-gray-600 animate-pulse" : ""}`} src={data?.trailer_url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;
