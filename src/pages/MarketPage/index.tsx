import { useParams } from "react-router-dom";
import Nav from "../../components/common/Nav";
import TopTitle from "../../components/common/TopTitle";
import ParkingLotList from "../../components/ParkingLot/ParkingLotList";
import styled from "@emotion/styled";

const MarketPage = () => {
  const { marketname } = useParams();

  return (
    <>
      <TopTitle text={`${marketname}`} />
      <Container>
        <Text>주변 주차장🚘</Text>
        <ParkingLotListWrapper>
          <ParkingLotList />
        </ParkingLotListWrapper>
      </Container>
      <Nav />
    </>
  );
};

export default MarketPage;

const Container = styled.div`
  margin: 6rem 1rem 0;
`;

const Text = styled.div`
  font-weight: 500;
  padding-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const ParkingLotListWrapper = styled.div`
  margin-bottom: 7rem;
`;
