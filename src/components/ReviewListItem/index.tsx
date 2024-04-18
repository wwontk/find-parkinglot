import { Link } from "react-router-dom";
import { ReviewDataProps } from "../../types/Review";
import useUserState from "../../hooks/userUserState";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const ReviewListItem = (props: ReviewDataProps) => {
  const { userState } = useUserState();
  const repeatCnt = parseInt(props.score);

  const handleDeleteReview = async () => {
    const confirm = window.confirm("리뷰를 삭제하시겠습니까?");
    if (confirm) {
      await deleteDoc(doc(db, "Reviews", props.reviewId));
    }
    alert("삭제되었습니다.");
  };

  return (
    <>
      <div className="border rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            className="w-7 h-7 rounded-full object-cover"
            src={props.profileImg}
            alt="profile"
          />
          <p className="text-sm flex-1">{props.nickname}</p>
          {props.useruid === userState.uid && (
            <button
              className="text-sm bg-theme-color text-white p-1 rounded"
              onClick={handleDeleteReview}
            >
              삭제
            </button>
          )}
        </div>
        <div>
          {props.myreview ? (
            <div className="text-zinc-500">
              <Link to={`/${props.prkplceNo}/${props.prkplceNm}/review`}>
                {props.prkplceNm}
              </Link>
            </div>
          ) : (
            <div className="text-zinc-500">{props.prkplceNm}</div>
          )}

          <div>{"⭐️".repeat(repeatCnt)}</div>
        </div>
        <div>{props.text}</div>
      </div>
    </>
  );
};

export default ReviewListItem;
