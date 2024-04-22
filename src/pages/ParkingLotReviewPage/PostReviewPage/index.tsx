import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import TopTitle from "../../../components/common/TopTitle";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import useUserState from "../../../hooks/userUserState";

const PostReviewPage = () => {
  const { prkplceNo, prkplceNm } = useParams();
  const { userState } = useUserState();

  const navigate = useNavigate();

  const [star, setStar] = useState("1");
  const [reviewText, , handleChangeReviewText] = useInput("");

  useEffect(() => {
    if (!userState.isLogin) {
      navigate("/login", { replace: true });
    }
  }, [navigate, userState.isLogin]);

  const handleChangeStar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStar(e.target.value);
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "Reviews"), {
      prkplceNo: prkplceNo,
      prkplceNm: prkplceNm,
      score: star,
      useruid: userState.uid,
      nickname: userState.nickname,
      profileImg: userState.profileImg,
      text: reviewText,
    });
    alert("리뷰가 등록되었습니다.");
    navigate(
      { pathname: `/${prkplceNo}/${prkplceNm}/review` },
      { replace: true }
    );
  };
  return (
    <>
      <TopTitle text="리뷰 작성하기" />
      <form className="mt-24" onSubmit={handleSumbit}>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-zinc-300">별점</span>
          <select
            name="star"
            id="star"
            value={star}
            className="border w-16 rounded-xl p-2"
            onChange={handleChangeStar}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <span className="font-semibold text-zinc-300">리뷰</span>
          <textarea
            className="border p-3 h-40 rounded-xl"
            value={reviewText}
            onChange={handleChangeReviewText}
          />
          <button className="bg-theme-color text-white p-2 rounded-xl">
            등록
          </button>
        </div>
      </form>
    </>
  );
};

export default PostReviewPage;
