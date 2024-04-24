import { useNavigate, useParams } from "react-router-dom";
import TopTitle from "../../components/common/TopTitle";
// import {
//   DocumentData,
//   collection,
//   onSnapshot,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import { useEffect, useState } from "react";
import ReviewListItem from "../../components/ReviewListItem";
import useGetReviewListQuery from "../../hooks/query/useGetReviewListQuery";

const ParkingLotReviewPage = () => {
  const navigate = useNavigate();

  const { prkplceNo, prkplceNm } = useParams();

  const { reviewListData } = useGetReviewListQuery(prkplceNo!);

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
        {reviewListData ? (
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
