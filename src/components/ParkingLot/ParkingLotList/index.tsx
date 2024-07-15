// import { useParams } from "react-router-dom";
// import useGetParkingLotQuery from "../../../hooks/query/useGetParkingLotQuery";
import { parkingLotDataType } from "../../../types/ParkingLot";
import ParkingLotListItem from "../ParkingLotListItem";
// import { RiErrorWarningFill } from "react-icons/ri";
// import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
// import Skeleton from "../../common/Skeleton";

import parkingLotData from "../../../data/parkingLotData";

const ParkingLotList = () => {
  // const { marketname } = useParams();
  // const {
  //   parkingLotData,
  //   parkingLotFecthNextPage,
  //   parkingLotHasNextPage,
  //   parkingLotIsLoading,
  // } = useGetParkingLotQuery(marketname);

  // const { bottomDiv } = useInfiniteScroll(
  //   parkingLotFecthNextPage,
  //   parkingLotHasNextPage
  // );

  // if (parkingLotIsLoading)
  //   return (
  //     <>
  //       <Skeleton cnt={5} />
  //     </>
  //   );

  return (
    <>
      {/* {parkingLotData?.pages.map((page) =>
        page.response.body.items ? (
          page.response.body.items.item.map((item: parkingLotDataType) => (
            <ParkingLotListItem
              key={`${item.prkplceNm}` + `${item.prkplceCnt}`}
              prkplceNm={item.prkplceNm}
              prkplceRoadNmAddr={
                item.prkplceRoadNmAddr === " "
                  ? item.prkplceLotnoAddr
                  : item.prkplceRoadNmAddr
              }
              prkplceNo={item.prkplceNo}
              prkplceLatPos={item.prkplceLatPos}
              prkplceLotPos={item.prkplceLotPos}
              prkplceOperInfo={item.prkplceOperInfo}
              prkplceChargeInfo={item.prkplceChargeInfo}
              prkplceCnt={item.prkplceCnt}
            />
          ))
        ) : (
          <div className="border p-5 rounded-2xl mb-4">
            <p className="flex justify-center">
              <RiErrorWarningFill size={40} color="#e6e6e6" />
            </p>
            <p className="text-center mt-4">근처 공영주차장이 없습니다😭</p>
          </div>
        )
      )} */}
      {parkingLotData.map((item: parkingLotDataType) => (
        <ParkingLotListItem
          key={`${item.prkplceNm}` + `${item.prkplceCnt}`}
          prkplceNm={item.prkplceNm}
          prkplceRoadNmAddr={
            item.prkplceRoadNmAddr === " "
              ? item.prkplceLotnoAddr
              : item.prkplceRoadNmAddr
          }
          prkplceNo={item.prkplceNo}
          prkplceLatPos={item.prkplceLatPos}
          prkplceLotPos={item.prkplceLotPos}
          prkplceOperInfo={item.prkplceOperInfo}
          prkplceChargeInfo={item.prkplceChargeInfo}
          prkplceCnt={item.prkplceCnt}
        />
      ))}
      {/* {bottomDiv()} */}
    </>
  );
};

export default ParkingLotList;
