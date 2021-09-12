import { FC } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import AnimeGrid from "../../components/AnimeGrid";
import { getAnimeList } from "../../api";
import Carousel from "../../components/Carousel";
import Skeleton from "../../components/Skeleton";

const Home: FC = () => {
  const { data, error, fetchNextPage, hasNextPage } = useInfiniteQuery("animeList", ({ pageParam = 1 }) => getAnimeList(pageParam), {
    getNextPageParam: (page) => (page.current_page + 1 <= page.count ? page.current_page + 1 : undefined),
  });

  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <div className="w-screen px-one-twenty mt-4">{data?.pages[0] ? <Carousel data={data?.pages[0].documents.slice(0, 10)} /> : <Skeleton style={{ height: "calc(0.22 * 99vw)", minHeight: 150 }} className="rounded-md" />}</div>
      <div>
        <InfiniteScroll dataLength={data?.pages.length || 0} next={fetchNextPage} hasMore={Boolean(hasNextPage)} loader={<></>}>
          <AnimeGrid skeleton={true} data={data?.pages.map((e, index) => (index === 0 ? e.documents.slice(10) : e.documents)) || [[]]} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
