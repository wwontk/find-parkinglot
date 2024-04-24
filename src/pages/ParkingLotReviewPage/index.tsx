import { useNavigate, useParams } from "react-router-dom";
import TopTitle from "../../components/common/TopTitle";
import ReviewListItem from "../../components/ReviewListItem";
import useGetReviewListQuery from "../../hooks/query/useGetReviewListQuery";
import styled from "@emotion/styled";

const ParkingLotReviewPage = () => {
  const navigate = useNavigate();

  const { prkplceNo, prkplceNm } = useParams();

  const { reviewListData } = useGetReviewListQuery(prkplceNo!);

  return (
    <>
      <TopTitle text={`${prkplceNm}`} />
      <BtnWrapper>
        <PostBtn onClick={() => navigate("post")}>리뷰 작성하기</PostBtn>
      </BtnWrapper>
      <Container>
        {reviewListData?.length ? (
          reviewListData.map((item, index) => (
            <ReviewListItem
              key={index}
              nickname={item.data.nickname}
              prkplceNo={item.data.prkplceNo}
              prkplceNm={item.data.prkplceNm}
              profileImg={item.data.profileImg}
              score={item.data.score}
              text={item.data.text}
              useruid={item.data.useruid}
              myreview={false}
              reviewId={item.id}
            />
          ))
        ) : (
          <NoDataWrapper>
            <div>주차장 리뷰가 없어요!😭</div>
            <div>새로운 리뷰를 추가해주세요</div>
          </NoDataWrapper>
        )}
      </Container>
    </>
  );
};

export default ParkingLotReviewPage;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PostBtn = styled.button`
  margin-top: 6rem;
  background-color: rgb(24 37 61);
  color: white;
  padding: 0.75rem;
  border-radius: 0.75rem;
`;

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NoDataWrapper = styled.div`
  border-width: 1px;
  text-align: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: rgb(161 161 170);
`;
