import { useParams } from "react-router-dom";
import useGetParkingLotQuery from "../../../hooks/query/useGetParkingLotQuery";
import { parkingLotDataType } from "../../../types/ParkingLot";
import ParkingLotListItem from "../ParkingLotListItem";

const ParkingLotList = () => {
  const { marketname } = useParams();
  const { parkingLotData } = useGetParkingLotQuery(marketname);

  return (
    <>
      {parkingLotData?.pages.map((page) =>
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
          />
        ))
      )}
    </>
  );
};

export default ParkingLotList;
