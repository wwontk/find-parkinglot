import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

interface TopTitleProps {
  text: string;
  bg?: string;
}

const TopTitle = (props: TopTitleProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Container
        className={`flex items-center w-full m-auto h-24 fixed top-0 left-0 right-0 z-10 ${
          props.bg ? props.bg : "bg-white"
        }`}
      >
        <div
          className={`absolute ml-4 border px-2 py-3 rounded-full cursor-pointer ${
            props.bg ? "text-white" : ""
          }`}
          onClick={handleBack}
        >
          <FaArrowLeft />
        </div>
        <div
          className={`flex-1 text-center font-bold text-2xl ${
            props.bg ? "text-white" : ""
          }`}
        >
          {props.text}
        </div>
      </Container>
    </>
  );
};

export default TopTitle;

const Container = styled.div`
  max-width: 24rem;
  @media (min-width: 800px) {
    max-width: 50rem;
  }
`;
