import { useSearchParams } from "react-router-dom";
import useGetMarketSearchQuery from "../../../hooks/query/useGetMarketSearchQuery";
import { marketListItemProps } from "../../../types/MarketList";
import MarketListItem from "../../../components/Market/MarketListItem";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const object = searchParams.get("object");
  const { marketSearchData } = useGetMarketSearchQuery(object);

  console.log(marketSearchData);
  return (
    <>
      <div className="mt-4">
        {marketSearchData?.response.body.items.map(
          (item: marketListItemProps) => (
            <MarketListItem mrktNm={item.mrktNm} rdnmadr={item.rdnmadr} />
          )
        )}
      </div>
    </>
  );
};

export default SearchResultPage;
