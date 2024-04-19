import { useSearchParams } from "react-router-dom";
import useGetMarketSearchQuery from "../../../hooks/query/useGetMarketSearchQuery";
import { marketListItemProps } from "../../../types/MarketList";
import MarketListItem from "../../../components/Market/MarketListItem";
import { RiErrorWarningFill } from "react-icons/ri";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const object = searchParams.get("object");
  const { marketSearchData } = useGetMarketSearchQuery(object);

  // console.log(marketSearchData);
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
          <div className="border p-5 rounded-2xl mb-4">
            <p className="flex justify-center">
              <RiErrorWarningFill size={40} color="#e6e6e6" />
            </p>
            <p className="text-center mt-4">시장 정보가 존재하지 않습니다😭</p>
            <div className="text-center text-sm mt-4 text-slate-300">
              <p>시장의 풀네임을 입력해주세요</p>
              <p>ex. 구매탄 (x) 구매탄시장 (o)</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResultPage;
