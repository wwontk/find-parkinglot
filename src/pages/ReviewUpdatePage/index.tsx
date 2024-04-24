import { doc, getDoc, updateDoc } from "firebase/firestore";
import TopTitle from "../../components/common/TopTitle";
import { db } from "../../firebase";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";

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
      <Form onSubmit={handleSumbit}>
        <Container>
          <DescText>별점</DescText>
          <Select
            name="star"
            id="star"
            value={newStar}
            onChange={handleChangeStar}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
          <DescText>리뷰</DescText>
          <TextArea value={newText} onChange={handleChangeReviewText} />
          <UpdateBtn>수정</UpdateBtn>
        </Container>
      </Form>
    </>
  );
};

export default ReviewUpdatePage;

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

const UpdateBtn = styled.button`
  background-color: rgb(24 37 61);
  color: white;
  padding: 0.5rem;
  border-radius: 0.75rem;
`;
