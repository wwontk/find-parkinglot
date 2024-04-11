import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface TopTitleProps {
  text: string;
}

const TopTitle = (props: TopTitleProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div
        className={`flex items-center max-w-default w-full m-auto h-24 fixed top-0 left-0 right-0`}
      >
        <div
          className="absolute ml-4 border px-2 py-3 rounded-full cursor-pointer"
          onClick={handleBack}
        >
          <FaArrowLeft />
        </div>
        <div className="flex-1 text-center font-bold text-2xl">
          {props.text}
        </div>
      </div>
    </>
  );
};

export default TopTitle;
