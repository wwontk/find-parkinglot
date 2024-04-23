import { useQuery } from "@tanstack/react-query";
import { axiosDefault } from "../../apis";

const fetchAPI = async (mrktNm: string | null) => {
  const res = await axiosDefault.get("/openapi/tn_pubr_public_trdit_mrkt_api", {
    params: {
      serviceKey: import.meta.env.VITE_DECODING_SERVICE_KEY,
      pageNo: 1,
      numOfRows: 10,
      type: "json",
      mrktNm: mrktNm,
    },
  });

  return res.data;
};

const useGetMarketSearchQuery = (mrktNm: string | null) => {
  const { data: marketSearchData, isFetching: marketSearchIsFetching } =
    useQuery({
      queryKey: ["marketSearchData", mrktNm],
      queryFn: () => fetchAPI(mrktNm),
    });
  return {
    marketSearchData,
    marketSearchIsFetching,
  };
};

export default useGetMarketSearchQuery;
