import { useEffect } from "react";
import Nav from "../../components/common/Nav";
import TopTitle from "../../components/common/TopTitle";

declare global {
  interface Window {
    kakao: any;
  }
}

const ParkingLotDetailPage = () => {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(37.519765, 127.023078), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const markerPosition = new window.kakao.maps.LatLng(37.519765, 127.023078);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, []);
  return (
    <>
      <TopTitle text="신사역" bg="bg-theme-color" />
      <div className="mt-24">
        <div id="map" className="w-full h-40 rounded-b-2xl"></div>
        <div className="mx-4 mt-4">
          <div>
            <div className="font-semibold text-2xl">주소</div>
            <div className="font-medium text-sm">
              서울특별시 강남구 신사동 가로수길
            </div>
          </div>
          <div className="mt-4">
            <div className="font-semibold text-2xl">주차구획수</div>
            <div className="font-medium text-sm">30</div>
          </div>
          <div className="mt-4">
            <div className="font-semibold text-2xl">운영정보</div>
            <div className="font-medium text-sm">
              <p>운영요일 : 평일</p>
              <p>평일운영시간 : 11:00 ~ 21:00</p>
              <p>토요일운영시간 : X</p>
              <p>공휴일운영시간 : X</p>
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default ParkingLotDetailPage;
