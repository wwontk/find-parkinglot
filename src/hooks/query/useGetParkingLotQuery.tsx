import { getParkingLotProps } from "../../types/ParkingLot";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAPI = async (props: getParkingLotProps) => {
  const res = await axios.get(
    "http://api.kcisa.kr/openapi/API_CNV_064/request",
    {
      params: {
        serviceKey: import.meta.env.VITE_PARKING_SERVICE_KEY,
        numOfRows: 10,
        pageNo: props.page,
        mktNm: props.mktNm,
        dist: 50,
      },
    }
  );

  return res.data;
};

const useGetParkingLotQuery = (mktNm: string | undefined) => {
  const {
    data: parkingLotData,
    fetchNextPage: parkingLotFecthNextPage,
    hasNextPage: parkingLotHasNextPage,
    isLoading: parkingLotIsLoading,
  } = useInfiniteQuery({
    queryKey: ["parkingLotList", mktNm],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => fetchAPI({ mktNm, page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage?.response.body.numOfRows *
        lastPage?.response.body.pageNo <
        lastPage?.response.body.totalCount
        ? parseInt(lastPage.response.body.pageNo) + 1
        : null;
    },
    staleTime: Infinity,
  });

  return {
    parkingLotData,
    parkingLotFecthNextPage,
    parkingLotHasNextPage,
    parkingLotIsLoading,
  };
};

export default useGetParkingLotQuery;
