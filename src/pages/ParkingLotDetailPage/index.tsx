import { useEffect } from "react";
import Nav from "../../components/common/Nav";
import TopTitle from "../../components/common/TopTitle";
import { Link, useLocation, useParams } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

const ParkingLotDetailPage = () => {
  const { prkplceNm } = useParams();
  const location = useLocation();
  const {
    prkplceCnt,
    prkplceLatPos,
    prkplceLotPos,
    prkplceOperInfo,
    prkplceRoadNmAddr,
    prkplceChargeInfo,
    prkplceNo,
  } = location.state.data;

  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(
        parseFloat(prkplceLatPos),
        parseFloat(prkplceLotPos)
      ), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const markerPosition = new window.kakao.maps.LatLng(
      parseFloat(prkplceLatPos),
      parseFloat(prkplceLotPos)
    );

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [prkplceLatPos, prkplceLotPos]);

  return (
    <>
      <TopTitle text={`${prkplceNm}`} bg="bg-theme-color" />
      <div className="mt-24 mb-28">
        <div id="map" className="w-full h-40 rounded-b-2xl"></div>
        <div className="my-3 text-center">
          <Link to={`/${prkplceNo}/${prkplceNm}/review`}>
            <button className="bg-theme-color text-white p-3 rounded-xl ">
              주차장 리뷰 보러가기 🚘
            </button>
          </Link>
        </div>
        <div className="mx-4 mt-4">
          <div>
            <div className="font-semibold text-2xl">주소</div>
            <div className="font-medium text-sm">{prkplceRoadNmAddr}</div>
          </div>
          <div className="mt-4">
            <div className="font-semibold text-2xl">주차구획수</div>
            <div className="font-medium text-sm">{prkplceCnt}</div>
          </div>
          <div className="mt-4">
            <div className="font-semibold text-2xl">운영정보</div>
            <div className="font-medium text-sm">
              <div>
                {prkplceOperInfo.split("\n").map((item: string) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold text-2xl">요금정보</div>
            <div className="font-medium text-sm">
              <div>
                {prkplceChargeInfo.split("\n").map((item: string) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default ParkingLotDetailPage;
