import { useNavigate, useParams } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import TopTitle from "../../../components/common/TopTitle";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import styled from "@emotion/styled";
import useUserStore from "../../../stores/useUserStore";

const PostReviewPage = () => {
  const { prkplceNo, prkplceNm } = useParams();
  const { userInfo } = useUserStore();

  const navigate = useNavigate();

  const [star, setStar] = useState("1");
  const [reviewText, , handleChangeReviewText] = useInput("");

  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (!userInfo.isLogin) {
      navigate("/login", { replace: true });
    }
  }, [navigate, userInfo.isLogin]);

  const handleChangeStar = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStar(e.target.value);
  };

  useEffect(() => {
    if (star && reviewText) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [star, reviewText]);

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "Reviews"), {
      prkplceNo: prkplceNo,
      prkplceNm: prkplceNm,
      score: star,
      useruid: userInfo.uid,
      nickname: userInfo.nickname,
      profileImg: userInfo.profileImg,
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
      <Form onSubmit={handleSumbit}>
        <Container>
          <DescText>별점</DescText>
          <Select
            name="star"
            id="star"
            value={star}
            onChange={handleChangeStar}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
          <DescText>리뷰</DescText>
          <TextArea value={`${reviewText}`} onChange={handleChangeReviewText} />
          <PostBtn disabled={!check}>등록</PostBtn>
        </Container>
      </Form>
    </>
  );
};

export default PostReviewPage;

const Form = styled.form`
  margin-top: 6rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DescText = styled.span`
  font-weight: 600;
  color: rgb(212 212 216);
`;

const Select = styled.select`
  border-width: 1px;
  width: 4rem;
  border-radius: 0.75rem;
  padding: 0.5rem;
`;

const TextArea = styled.textarea`
  border-width: 1px;
  padding: 0.75rem;
  height: 10rem;
  border-radius: 0.75rem;
`;

const PostBtn = styled.button`
  background-color: rgb(24 37 61);
  color: white;
  padding: 0.5rem;
  border-radius: 0.75rem;
  &:disabled {
    background-color: rgb(203 213 225);
  }
`;
