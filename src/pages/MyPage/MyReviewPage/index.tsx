import { useEffect, useState } from "react";
import TopTitle from "../../../components/common/TopTitle";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import useUserState from "../../../hooks/userUserState";
import ReviewListItem from "../../../components/ReviewListItem";

const MyReviewPage = () => {
  const { userState } = useUserState();
  const [myReview, setMyReview] = useState<
    { id: string; data: DocumentData }[]
  >([]);

  useEffect(() => {
    const q = query(
      collection(db, "Reviews"),
      where("useruid", "==", userState.uid)
    );
    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setMyReview(newArray);
    });
  }, [userState.uid]);

  return (
    <>
      <TopTitle text="내가 쓴 리뷰" />
      <div className="mt-24">
        <div className="mt-4 mb-4 flex flex-col gap-2">
          {myReview.length > 0 ? (
            myReview.map((item, index) => (
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
            <div className="border text-center p-3 rounded-xl text-zinc-400">
              <div>작성한 주차장 리뷰가 없어요!😭</div>
              <div>리뷰를 작성해보세요!</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyReviewPage;
