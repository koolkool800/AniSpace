import { FC, Fragment, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";

import { getAnimeDetail } from "../../api";
import PureText from "../../components/PureText";

import Play from "../../asset/svg/Play";

const Anime: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery(`anime-${id}`, () => getAnimeDetail(id));

  const [expandDescription, setExpandDescription] = useState(false);
  const [expandGenres, setExpandGenres] = useState(false);
  const [trailerBackdropOpened, setTrailerBackdropOpened] = useState(false);

  if (error) return <div>Something went wrong</div>;

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="relative">
      <div className="absolute w-screen h-32 md:h-64 top-0 left-0 background-image z-0 opacity-50" style={{ backgroundImage: `url(${data?.banner_image})` }}></div>
      <div className="flex flex-col md:flex-row gap-5 px-one-twenty pt-24 md:pt-48 md:items-start">
        <div className="flex justify-center flex-shrink-0">
          <img className="z-10 h-auto rounded-md" src={data?.cover_image} alt="" />
        </div>
        <div className="z-10 flex-grow">
          <div className="flex gap-3 md:py-3 md:justify-start justify-center">
            <button className="bg-dark-lighten md:bg-dark-normal hover:bg-dark-darken text-white transition py-2 px-4 rounded-md outline-none flex items-center gap-1">
              <Play style={{ height: 30, width: 30 }} />
              <span>Watch now</span>
            </button>
            {data?.trailer_url && (
              <button onClick={() => setTrailerBackdropOpened(true)} className="bg-dark-lighten md:bg-dark-normal hover:bg-dark-darken text-white transition py-2 px-4 rounded-md outline-none flex items-center gap-1">
                <Play style={{ height: 30, width: 30 }} />
                <span>Watch trailer</span>
              </button>
            )}
          </div>
          <PureText text={data?.titles?.en || data?.titles?.jp || data?.titles?.it || "Unknown title"} className="text-white text-3xl mt-2" />
          {(data?.descriptions?.en || data?.descriptions?.jp || data?.descriptions?.it) && (
            <div>
              <PureText text={data?.descriptions?.en || data?.descriptions?.jp || data?.descriptions?.it || ""} className={`text-gray-300 text-base${!expandDescription ? " ellipsis-four" : ""}`} />
              <span onClick={() => setExpandDescription((prev) => !prev)} className="text-blue-400 hover:text-blue-500 transition cursor-pointer">
                {expandDescription ? "Hide" : "Expand"}
              </span>
            </div>
          )}

          {data?.genres?.length && (
            <div>
              <p className={`text-gray-300${!expandGenres ? " ellipsis-two" : ""}`}>
                <span>Genre: </span>
                {data?.genres?.map((e, index) => (
                  <Fragment key={e}>
                    <Link className="hover:text-gray-400 transition" to={`/genre/${encodeURIComponent(e)}`}>
                      {e}
                    </Link>
                    {index < Number(data?.genres?.length) - 1 && <span>, </span>}
                  </Fragment>
                ))}
              </p>
              <span onClick={() => setExpandGenres((prev) => !prev)} className="text-blue-400 hover:text-blue-500 transition cursor-pointer">
                {expandGenres ? "Hide" : "More genres"}
              </span>
            </div>
          )}
        </div>
      </div>
      {trailerBackdropOpened && (
        <div onClick={() => setTrailerBackdropOpened(false)} className={`fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-opacity-60 z-20 bg-dark-darken overflow-hidden`}>
          <div className="max-w-md w-full overflow-hidden">
            <div className="relative w-full h-0 overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe className="absolute w-full h-full top-0 left-0" src={data?.trailer_url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;
