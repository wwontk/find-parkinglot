import { getParkingLotProps } from "../../types/ParkingLot";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAPI = async (props: getParkingLotProps) => {
  const res = await axios.get(
    "https://proxy.cors.sh/http://api.kcisa.kr/openapi/API_CNV_064/request",
    {
      headers: {
        "x-cors-api-key":
          "live_7e11ac0c11f6b0a7d4f3d11ded385c4fdf4382b926264954727f1200ab482cc8",
      },
      params: {
        serviceKey: import.meta.env.VITE_PARKING_SERVICE_KEY,
        numOfRows: 10,
        pageNo: props.page,
        mktNm: props.mktNm,
        dist: 1,
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
  });

  return {
    parkingLotData,
    parkingLotFecthNextPage,
    parkingLotHasNextPage,
  };
};

export default useGetParkingLotQuery;
