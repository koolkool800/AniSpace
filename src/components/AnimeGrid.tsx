import { FC, Fragment, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Anime } from "../types";

import Play from "../asset/svg/Play";
import Skeleton from "../components/Skeleton";

interface AnimeGridProps {
  data: Anime[][];
  skeleton: boolean;
  title: string;
}

const AnimeGrid: FC<AnimeGridProps> = ({ data, skeleton, title }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [skeletonCount, setSkeletonCount] = useState(6);

  useEffect(() => {
    if (gridRef.current) {
      try {
        const gridCols = window.getComputedStyle(gridRef.current).getPropertyValue("grid-template-columns").split(" ").length;
        setSkeletonCount(gridCols * 2);
      } catch (error) {
        setSkeletonCount(6);
      }
    }
  }, [gridRef]);

  return (
    <>
      <h1 className="mx-one-twenty text-gray-300 text-2xl my-4">{title}</h1>
      <div ref={gridRef} className="grid-auto-fill mx-one-twenty">
        {data.map((group, index) => (
          <Fragment key={index}>
            {group.map((e) => (
              <Link key={e.id} to={`/anime/${e.id}`}>
                <div className="relative rounded-md overflow-hidden bg-dark-darken" style={{ paddingBottom: "156.25%" }}>
                  <div className="h-full w-full absolute top-0 left-0">
                    <div className="card-background-container">
                      <img className="h-full w-full object-cover" src={e.cover_image} alt="" />
                      <Play className="top-1/2 left-1/2 absolute opacity-0 group-hover:opacity-100 transition" style={{ transform: "translate(-50%, -50%)" }} />
                    </div>
                    <p className="flex-shrink-0 ellipsis-two text-xs h-9 md:text-base md:h-14 px-2 py-1 uppercase hover:text-blue-sky transition font-medium">{e.titles?.en || e.titles?.jp || e.titles?.it || "Unknown title"}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Fragment>
        ))}
        {skeleton && (
          <>
            {new Array(skeletonCount).fill("").map((_, index) => (
              <Skeleton key={index} className="rounded-xl" />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default AnimeGrid;
