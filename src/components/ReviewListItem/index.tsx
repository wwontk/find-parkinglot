import { ReviewDataProps } from "../../types/Review";

const ReviewListItem = (props: ReviewDataProps) => {
  const repeatCnt = parseInt(props.score);
  return (
    <>
      <div className="border rounded-xl p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            className="w-7 h-7 rounded-full object-cover"
            src={props.profileImg}
            alt="profile"
          />
          <p className="text-sm">{props.nickname}</p>
        </div>
        <div>
          <div className="text-zinc-500">{props.prkplceNm}</div>
          <div>{"⭐️".repeat(repeatCnt)}</div>
        </div>
        <div>{props.text}</div>
      </div>
    </>
  );
};

export default ReviewListItem;
