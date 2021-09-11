import { FC } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import AnimeGrid from "../../components/AnimeGrid";
import { getAnimeList } from "../../api";
import Skeleton from "../../components/Skeleton";

const Home: FC = () => {
  const { data, error, fetchNextPage, hasNextPage } = useInfiniteQuery("animeList", ({ pageParam = 1 }) => getAnimeList(pageParam), {
    getNextPageParam: (page) => (page.current_page + 1 <= page.count ? page.current_page + 1 : false),
  });

  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <InfiniteScroll
        style={{
          height: "auto",
          overflow: "hidden",
          width: "100vw",
        }}
        dataLength={data?.pages.length || 0}
        next={fetchNextPage}
        hasMore={Boolean(hasNextPage)}
        loader={
          <div className="w-screen flex justify-center mt-5">
            <div className="grid-auto-fill w-full">
              {new Array(6).fill("").map((_, index) => (
                <Skeleton key={index} className="h-60 rounded-xl" />
              ))}
            </div>
          </div>
        }
      >
        <AnimeGrid data={data?.pages.map((e) => e.documents) || [[]]} />
      </InfiniteScroll>
    </div>
  );
};

export default Home;
