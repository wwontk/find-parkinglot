import { Link } from "react-router-dom";
import { parkingLotListItemProps } from "../../../types/ParkingLot";

const ParkingLotListItem = (props: parkingLotListItemProps) => {
  return (
    <>
      <Link to={`/parkinglot/${props.prkplceNo}`}>
        <div className="bg-white p-5 rounded-2xl shadow mb-4">
          <p className="font-bold">{props.prkplceNm}</p>
          <p className="text-sm">{props.prkplceRoadNmAddr}</p>
        </div>
      </Link>
    </>
  );
};

export default ParkingLotListItem;
