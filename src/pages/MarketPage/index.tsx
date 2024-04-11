import Nav from "../../components/common/Nav";
import TopTitle from "../../components/common/TopTitle";

const MarketPage = () => {
  return (
    <>
      <TopTitle text="강남시장" />
      <div className="mt-24 mx-4">
        <div className="font-medium pt-4 mb-8 text-lg">주변 주차장🚘</div>
        <div>
          <div className="bg-white p-5 rounded-2xl shadow mb-4">
            <p className="font-bold">신사역</p>
            <p className="text-sm">서울특별시 강남구 신사동 가로수길</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow mb-4">
            <p className="font-bold">신구초교</p>
            <p className="text-sm">서울특별시 강남구 신사동 가로수길</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow mb-4">
            <p className="font-bold">논현로131길</p>
            <p className="text-sm">서울특별시 강남구 신사동 가로수길</p>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default MarketPage;
