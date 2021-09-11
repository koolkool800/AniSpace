import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { Anime } from "../types";

interface AnimeGridProps {
  data: Anime[][];
}

const AnimeGrid: FC<AnimeGridProps> = ({ data }) => {
  return (
    <>
      <h1 className="px-one-twenty text-gray-300 text-2xl my-4">Recommend</h1>
      <div className="w-full m-0 p-0 flex justify-center">
        <div className="grid-auto-fill">
          {data.map((group, index) => (
            <Fragment key={index}>
              {group.map((e) => (
                <Link key={e.id} to={`/anime/${e.id}`}>
                  <div className="relative rounded-xl overflow-hidden bg-dark-darken">
                    <div className="w-full h-full flex flex-col">
                      <div className="flex-grow h-56 relative hover:opacity-70 transition group">
                        <img className="h-full w-full object-cover" src={e.cover_image} alt="" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 top-1/2 left-1/2 absolute text-white opacity-0 group-hover:opacity-100 transition" style={{ transform: "translate(-50%, -50%)" }} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-400 flex-shrink-0 ellipsis-two text-base h-14 px-2 py-1 uppercase hover:text-blue-sky transition font-medium">{e.titles?.en || e.titles?.jp || e.titles?.it || "Unknown title"}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnimeGrid;
