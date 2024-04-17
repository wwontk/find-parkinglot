import { useNavigate, useParams } from "react-router-dom";
import TopTitle from "../../components/common/TopTitle";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import ReviewListItem from "../../components/ReviewListItem";

const ParkingLotReviewPage = () => {
  const navigate = useNavigate();

  const { prkplceNo, prkplceNm } = useParams();

  const [review, setReview] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "Reviews"),
      where("prkplceNo", "==", prkplceNo)
    );
    onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => doc.data());
      setReview(newArray);
    });
  }, [prkplceNo]);

  return (
    <>
      <TopTitle text={`${prkplceNm}`} />
      <div className="flex justify-end">
        <button
          className="mt-24 bg-theme-color text-white p-3 rounded-xl"
          onClick={() => navigate("post")}
        >
          리뷰 작성하기
        </button>
      </div>
      <div className="mt-4 mb-4 flex flex-col gap-2">
        {review.length > 0 ? (
          review.map((item, index) => (
            <ReviewListItem
              key={index}
              nickname={item.nickname}
              prkplceNo={item.prkplceNo}
              prkplceNm={item.prkplceNm}
              profileImg={item.profileImg}
              score={item.score}
              text={item.text}
              useruid={item.useruid}
            />
          ))
        ) : (
          <div className="border text-center p-3 rounded-xl text-zinc-400">
            <div>주차장 리뷰가 없어요!😭</div>
            <div>새로운 리뷰를 추가해주세요</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ParkingLotReviewPage;
