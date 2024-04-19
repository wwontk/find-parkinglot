import { useParams } from "react-router-dom";
import Nav from "../../components/common/Nav";
import TopTitle from "../../components/common/TopTitle";
import ParkingLotList from "../../components/ParkingLot/ParkingLotList";

const MarketPage = () => {
  const { marketname } = useParams();

  return (
    <>
      <TopTitle text={`${marketname}`} />
      <div className="mt-24 mx-4">
        <div className="font-medium pt-4 mb-8 text-lg">주변 주차장🚘</div>
        <div className="mb-28">
          <ParkingLotList />
        </div>
      </div>
      <Nav />
    </>
  );
};

export default MarketPage;
