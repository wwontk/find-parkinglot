import useGetMarketListQuery from "../../../hooks/query/useGetMarketListQuery";
import { marketListDataType } from "../../../types/MarketList";
import MarketListItem from "../MarketListItem";

const MarketList = () => {
  const { marketListData } = useGetMarketListQuery();
  return (
    <>
      {marketListData?.pages.map((page) =>
        page.response.body.items.map((item: marketListDataType) => (
          <MarketListItem
            key={`${item.mrktNm}` + `${item.storNumber}`}
            mrktNm={item.mrktNm}
            rdnmadr={item.rdnmadr}
          />
        ))
      )}
    </>
  );
};

export default MarketList;
