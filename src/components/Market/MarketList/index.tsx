import { useParams } from "react-router-dom";
import useGetMarketListQuery from "../../../hooks/query/useGetMarketListQuery";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { marketListDataType } from "../../../types/MarketList";
import MarketListItem from "../MarketListItem";

const MarketList = () => {
  let { city } = useParams();
  if (city === undefined) city = "전국";
  const { marketListData, marketListFetchNextPage, marketListHasNextPage } =
    useGetMarketListQuery();

  const { bottomDiv } = useInfiniteScroll(
    marketListFetchNextPage,
    marketListHasNextPage
  );

  return (
    <>
      {marketListData?.pages.map((page) =>
        city !== "전국"
          ? page.response.body.items
              .filter((item: marketListDataType) => item.rdnmadr.includes(city))
              .map((item: marketListDataType) => (
                <MarketListItem
                  key={`${item.mrktNm}` + `${item.storNumber}`}
                  mrktNm={item.mrktNm}
                  rdnmadr={item.rdnmadr}
                />
              ))
          : page.response.body.items.map((item: marketListDataType) => (
              <MarketListItem
                key={`${item.mrktNm}` + `${item.storNumber}`}
                mrktNm={item.mrktNm}
                rdnmadr={item.rdnmadr}
              />
            ))
      )}
      {bottomDiv()}
    </>
  );
};

export default MarketList;
