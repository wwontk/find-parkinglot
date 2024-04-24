import TopTitle from "../../../components/common/TopTitle";
import useUserState from "../../../hooks/userUserState";
import ReviewListItem from "../../../components/ReviewListItem";
import useGetMyReviewListQuery from "../../../hooks/query/useGetMyReviewListQuery";
import styled from "@emotion/styled";

const MyReviewPage = () => {
  const { userState } = useUserState();
  const useruid = userState.uid;

  const { myReviewListData } = useGetMyReviewListQuery(useruid);

  return (
    <>
      <TopTitle text="내가 쓴 리뷰" />
      <Container>
        <ReviewListWrapper>
          {myReviewListData?.length ? (
            myReviewListData.map((item, index) => (
              <ReviewListItem
                key={index}
                nickname={item.data.nickname}
                prkplceNo={item.data.prkplceNo}
                prkplceNm={item.data.prkplceNm}
                profileImg={item.data.profileImg}
                score={item.data.score}
                text={item.data.text}
                useruid={item.data.useruid}
                myreview={true}
                reviewId={item.id}
              />
            ))
          ) : (
            <NoReviewDataWrapper>
              <div>작성한 주차장 리뷰가 없어요!😭</div>
              <div>리뷰를 작성해보세요!</div>
            </NoReviewDataWrapper>
          )}
        </ReviewListWrapper>
      </Container>
    </>
  );
};

export default MyReviewPage;

const Container = styled.div`
  margin-top: 6rem;
`;

const ReviewListWrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NoReviewDataWrapper = styled.div`
  border-width: 1px;
  text-align: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  color: rgb(161 161 170);
`;
