import { FC, Fragment, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";

import { getAnimeDetail } from "../../api";
import PureText from "../../components/PureText";

const Anime: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery(`anime-${id}`, () => getAnimeDetail(id));

  const [expandDescription, setExpandDescription] = useState(false);
  const [expandGenres, setExpandGenres] = useState(false);

  if (error) return <div>Something went wrong</div>;

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="relative">
      <div className="absolute w-screen h-32 md:h-64 top-0 left-0 background-image z-0" style={{ backgroundImage: `url(${data?.banner_image})` }}></div>
      <div className="flex gap-5 px-one-twenty pt-48 items-start">
        <img className="z-10 h-auto rounded-md" src={data?.cover_image} alt="" />
        <div className="z-10">
          <div className="flex gap-3 py-3">
            <button className="bg-dark-normal hover:bg-dark-darken text-white transition py-2 px-6 rounded-md">Watch now</button>
            <button className="bg-dark-normal hover:bg-dark-darken text-white transition py-2 px-6 rounded-md">Watch trailer</button>
          </div>
          <PureText text={data?.titles?.en || data?.titles?.jp || data?.titles?.it || "Unknown title"} className="text-white text-3xl mt-2" />
          {(data?.descriptions?.en || data?.descriptions?.jp || data?.descriptions?.it) && (
            <div>
              <PureText text={data?.descriptions?.en || data?.descriptions?.jp || data?.descriptions?.it || ""} className={`text-gray-300 text-lg${!expandDescription ? " ellipsis-four" : ""}`} />
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
    </div>
  );
};

export default Anime;
