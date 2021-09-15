import { FC, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";

import AnimeGrid from "../components/AnimeGrid";
import { searchAnime } from "../api";
import WentWrong from "../components/WentWrong";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: FC = () => {
  const history = useHistory();
  const query = useQuery();

  const q = String(query.get("q"));

  useEffect(() => {
    if (!query.get("q")?.trim()) {
      history.push("/");
    }
  }, [history, query]);

  const { data, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(`search-${encodeURIComponent(q)}`, ({ pageParam = 1 }) => searchAnime(pageParam, q), {
    getNextPageParam: (page) => (page.current_page + 1 <= page.last_page ? page.current_page + 1 : undefined),
  });

  if (error) return <WentWrong />;

  return (
    <>
      <div>
        <InfiniteScroll dataLength={data?.pages.length || 0} next={fetchNextPage} hasMore={Boolean(hasNextPage)} loader={<></>}>
          <AnimeGrid title={`Search result for ${q}${data?.pages[0]?.documents?.length === 0 ? " : No result found" : ""}`} skeleton={Boolean(isFetching)} data={data?.pages.map((e) => e.documents) || [[]]} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Search;
