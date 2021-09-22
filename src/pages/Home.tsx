import { FC, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import AnimeGrid from "../components/AnimeGrid";
import { getAnimeList } from "../api";
import Carousel from "../components/Carousel";
import Skeleton from "../components/Skeleton";
import WentWrong from "../components/WentWrong";

import { getAnimeStorage } from "../utils/localStorage";

const Home: FC = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery("animeList", ({ pageParam = 1 }) => getAnimeList(pageParam), {
    getNextPageParam: (page) => (page.current_page + 1 <= page.last_page ? page.current_page + 1 : undefined),
  });

  const recently = useMemo(getAnimeStorage, [data]);

  if (error) return <WentWrong />;

  return (
    <>
      <div className="w-screen px-one-twenty mt-4">{data?.pages[0] ? <Carousel data={data?.pages[0].documents.slice(0, 10)} /> : <Skeleton style={{ height: "calc(0.22 * 99vw)", minHeight: 150 }} className="rounded-md" />}</div>
      <div>
        <InfiniteScroll dataLength={data?.pages.length || 0} next={fetchNextPage} hasMore={Boolean(hasNextPage)} loader={<></>}>
          {recently.length > 0 && <AnimeGrid title="Recently" skeleton={false} data={[recently]} />}
          <AnimeGrid title="Recommend" skeleton={isFetching} data={data?.pages.map((e, index) => (index === 0 ? e.documents.slice(10) : e.documents)) || [[]]} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
