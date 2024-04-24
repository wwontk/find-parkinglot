import MarketList from "../../../components/Market/MarketList";
import styled from "@emotion/styled";

const DivisionCityPage = () => {
  return (
    <>
      <MarketListWrapper>
        <MarketList />
      </MarketListWrapper>
    </>
  );
};

export default DivisionCityPage;

const MarketListWrapper = styled.div`
  margin-bottom: 7rem;
`;
