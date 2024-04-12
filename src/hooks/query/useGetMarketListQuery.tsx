import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosDefault } from "../../apis";

const fetchAPI = async (page: number) => {
  const res = await axiosDefault.get("/openapi/tn_pubr_public_trdit_mrkt_api", {
    params: {
      serviceKey: import.meta.env.VITE_DECODING_SERVICE_KEY,
      pageNo: page,
      numOfRows: 10,
      type: "json",
    },
  });

  return res.data;
};

const useGetMarketListQuery = () => {
  const {
    data: marketListData,
    fetchNextPage: marketListFetchNextPage,
    hasNextPage: marketListHasNextPage,
  } = useInfiniteQuery({
    queryKey: ["marketList"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => fetchAPI(pageParam),
    getNextPageParam: (lastPage, allPage) => {
      const nextpage = allPage.length;
      return lastPage.length === 0 ? null : nextpage;
    },
  });
  return {
    marketListData,
    marketListFetchNextPage,
    marketListHasNextPage,
  };
};

export default useGetMarketListQuery;
