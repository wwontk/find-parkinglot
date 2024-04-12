import Nav from "../../components/common/Nav";
import regionList from "../../data/RegionList";
import MarketList from "../../components/Market/MarketList";

const HomePage = () => {
  return (
    <>
      <div className="mt-12 font-bold text-3xl">
        <p className="font-medium text-sm">시장가자! 근처에 있는</p>
        <p>주차장</p>
        <p>찾아줘🚘</p>
      </div>
      <div>
        <ul className="my-10 flex whitespace-nowrap overflow-auto">
          {regionList.map((item, index) => (
            <li
              key={index}
              className="bg-slate-100 px-5 py-2.5 mr-4 rounded-full"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="font-medium mb-7">Traditional Market 🥬</div>
      <div className="mb-28">
        <MarketList />
      </div>
      <Nav />
    </>
  );
};

export default HomePage;
