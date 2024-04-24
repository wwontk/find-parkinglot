import { useSearchParams } from "react-router-dom";
import useGetMarketSearchQuery from "../../../hooks/query/useGetMarketSearchQuery";
import { marketListItemProps } from "../../../types/MarketList";
import MarketListItem from "../../../components/Market/MarketListItem";
import { RiErrorWarningFill } from "react-icons/ri";
import Skeleton from "../../../components/common/Skeleton";
import styled from "@emotion/styled";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const object = searchParams.get("object");
  const { marketSearchData, marketSearchIsFetching } =
    useGetMarketSearchQuery(object);

  if (marketSearchIsFetching)
    return (
      <>
        <div className="mt-4">
          <Skeleton cnt={3} />
        </div>
      </>
    );

  return (
    <>
      <div className="mt-4">
        {marketSearchData?.response.header.resultCode === "00" ? (
          marketSearchData?.response.body.items.map(
            (item: marketListItemProps) => (
              <MarketListItem
                key={`${item.mrktNm} + ${item.rdnmadr}`}
                mrktNm={item.mrktNm}
                rdnmadr={item.rdnmadr}
              />
            )
          )
        ) : (
          <Container>
            <IconWrapper>
              <RiErrorWarningFill size={40} color="#e6e6e6" />
            </IconWrapper>
            <Text>시장 정보가 존재하지 않습니다😭</Text>
            <SubTextWrapper>
              <p>시장의 풀네임을 입력해주세요</p>
              <p>ex. 구매탄 (x) 구매탄시장 (o)</p>
            </SubTextWrapper>
          </Container>
        )}
      </div>
    </>
  );
};

export default SearchResultPage;

const Container = styled.div`
  border-width: 1px;
  padding: 1.25rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.p`
  display: flex;
  justify-content: center;
`;

const Text = styled.p`
  text-align: center;
  margin-top: 1rem;
`;

const SubTextWrapper = styled.div`
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 1rem;
  color: rgb(203 213 225);
`;
