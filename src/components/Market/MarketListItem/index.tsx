import { Link } from "react-router-dom";
import { marketListItemProps } from "../../../types/MarketList";

const MarketListItem = (props: marketListItemProps) => {
  return (
    <>
      <Link to={`/market/${props.mrktNm}`}>
        <div className="bg-slate-200 p-5 rounded-2xl mb-4">
          <p className="font-semibold">{props.mrktNm}</p>
          <p>{props.rdnmadr}</p>
        </div>
      </Link>
    </>
  );
};

export default MarketListItem;
