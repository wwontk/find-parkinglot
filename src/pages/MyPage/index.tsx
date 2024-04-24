import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/common/Nav";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import useUserState from "../../hooks/userUserState";
import { useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import styled from "@emotion/styled";

const MyPage = () => {
  const navigate = useNavigate();
  const { userState, resetUser } = useUserState();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogoutButton = async () => {
    try {
      await signOut(auth).then(() => {
        resetUser();
        alert("로그아웃 하였습니다.");
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderTitle>profile</HeaderTitle>
      <Container>
        {userState.profileImg ? (
          <>
            <ProfileImg src={userState.profileImg} alt="프로필이미지" />
          </>
        ) : (
          <ProfileBasic>
            <IoPerson size={70} color="white" />
          </ProfileBasic>
        )}
        <NicknameText>{userState.nickname}</NicknameText>
        <div>
          <Link to={"/editprofile"}>
            <MypageNavWrapper>
              <MyPageNavIcon>
                <IoPerson size={25} />
              </MyPageNavIcon>
              <p className="ml-4 flex-1">유저 프로필 수정</p>
              <div className="mr-2">
                <FaArrowRight />
              </div>
            </MypageNavWrapper>
          </Link>
          <Link to={"/myreview"}>
            <MypageNavWrapper>
              <MyPageNavIcon>
                <MdOutlineRateReview size={25} />
              </MyPageNavIcon>
              <p className="ml-4 flex-1">내가 쓴 리뷰</p>
              <div className="mr-2">
                <FaArrowRight />
              </div>
            </MypageNavWrapper>
          </Link>
        </div>
        <LogoutBtn onClick={handleLogoutButton}>로그아웃</LogoutBtn>
      </Container>
      <Nav />
    </>
  );
};

export default MyPage;

const HeaderTitle = styled.div`
  text-align: center;
  font-weight: 600;
  margin: 2.25rem 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
  object-fit: cover;
`;

const ProfileBasic = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 9999px;
  background-color: rgb(226 232 240);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NicknameText = styled.p`
  margin: 1.25rem 0 2.5rem;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const MypageNavWrapper = styled.div`
  width: 18rem;
  height: 4rem;
  margin: 0 auto;
  background-color: rgb(241 245 249);
  display: flex;
  align-items: center;
  border-radius: 1rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const MyPageNavIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: rgb(228 228 231);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutBtn = styled.button`
  margin-top: 1.25rem;
  font-weight: 600;
  color: rgb(212 212 216);
`;
