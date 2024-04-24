import { useEffect } from "react";
import Nav from "../../components/common/Nav";
import TopTitle from "../../components/common/TopTitle";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";

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
      <Container>
        <Map id="map"></Map>
        <ReviewBtnWrapper>
          <Link to={`/${prkplceNo}/${prkplceNm}/review`}>
            <ReviewBtn>주차장 리뷰 보러가기 🚘</ReviewBtn>
          </Link>
        </ReviewBtnWrapper>
        <InfoWrapper>
          <div>
            <InfoTitle>주소</InfoTitle>
            <InfoText>{prkplceRoadNmAddr}</InfoText>
          </div>
          <div className="mt-4">
            <InfoTitle>주차구획수</InfoTitle>
            <InfoText>{prkplceCnt}</InfoText>
          </div>
          <div className="mt-4">
            <InfoTitle>운영정보</InfoTitle>
            <InfoText>
              <div>
                {prkplceOperInfo.split("\n").map((item: string) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </InfoText>
          </div>
          <div className="mt-4">
            <InfoTitle>요금정보</InfoTitle>
            <InfoText>
              <div>
                {prkplceChargeInfo.split("\n").map((item: string) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </InfoText>
          </div>
        </InfoWrapper>
      </Container>
      <Nav />
    </>
  );
};

export default ParkingLotDetailPage;

const Container = styled.div`
  margin: 6rem 0 7rem;
`;

const Map = styled.div`
  width: 100%;
  height: 10rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

const ReviewBtnWrapper = styled.div`
  margin: 0.75rem 0;
  text-align: center;
`;

const ReviewBtn = styled.button`
  background-color: rgb(24 37 61);
  color: white;
  padding: 0.75rem;
  border-radius: 0.75rem;
`;

const InfoWrapper = styled.div`
  margin: 1rem 1rem 0;
`;

const InfoTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const InfoText = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;
