import { doc, getDoc, updateDoc } from "firebase/firestore";
import TopTitle from "../../components/common/TopTitle";
import { db } from "../../firebase";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ReviewUpdatePage = () => {
  const navigate = useNavigate();

  const { reviewid } = useParams();
  const reviewIdStr = String(reviewid);

  const [newStar, setNewStar] = useState("1");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "Reviews", reviewIdStr);
      const docSnap = await getDoc(docRef);
      const reviewDataArray = docSnap.data();
      setNewStar(reviewDataArray?.score);
      setNewText(reviewDataArray?.text);
    };
    getData();
  }, [reviewIdStr]);

  const handleChangeStar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStar(e.target.value);
  };

  const handleChangeReviewText = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewText(e.target.value);
  };

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    const ref = doc(db, "Reviews", reviewIdStr);
    await updateDoc(ref, {
      text: newText,
      score: newStar,
    });
    alert("수정이 완료되었습니다.");
    navigate(-1);
  };
  return (
    <>
      <TopTitle text="리뷰 수정하기" />
      <form className="mt-24" onSubmit={handleSumbit}>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-zinc-300">별점</span>
          <select
            name="star"
            id="star"
            value={newStar}
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
            value={newText}
            onChange={handleChangeReviewText}
          />
          <button className="bg-theme-color text-white p-2 rounded-xl">
            수정
          </button>
        </div>
      </form>
    </>
  );
};

export default ReviewUpdatePage;
