import { Link } from "react-router-dom";
import Nav from "../../components/common/Nav";
import regionList from "../../data/RegionList";

const HomePage = () => {
  return (
    <>
      <div className="mt-12 font-bold text-3xl">
        <p>주차장</p>
        <p>찾아줘🚘</p>
      </div>
      <div>
        <ul className="my-10 flex whitespace-nowrap overflow-auto">
          {regionList.map((item) => (
            <li className="bg-slate-100 px-5 py-2.5 mr-4 rounded-full">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="font-medium mb-7">Traditional Market 🥬</div>
      <div>
        <Link to={`/market/강남시장`}>
          <div className="bg-slate-200 p-5 rounded-2xl">
            <p className="font-semibold">강남시장</p>
            <p>서울특별시 강남구 압구정로 2길 46</p>
          </div>
        </Link>
      </div>
      <Nav />
    </>
  );
};

export default HomePage;
