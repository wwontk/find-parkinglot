import { useEffect, useState } from "react";
import MarketList from "../../components/Market/MarketList";
import Nav from "../../components/common/Nav";
import regionList from "../../data/RegionList";
import { Link, useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { IoPerson } from "react-icons/io5";
import styled from "@emotion/styled";
import useUserStore from "../../stores/useUserStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { city } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState<string | null>("");

  const { userInfo, setUserInfo } = useUserStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          uid: user.uid,
          email: user.email,
          nickname: user.displayName,
          profileImg: user.photoURL,
          isLogin: true,
        });
        setIsLoggedIn(true);
        setNickname(user.displayName);
      }
    });
  }, []);

  const handleLoginBtnClick = () => {
    navigate("/login");
  };

  return (
    <>
      <HomeTopBar className="max-w-default">
        {isLoggedIn ? (
          <>
            {userInfo.profileImg ? (
              <ProfileImg
                className="ring-2 ring-white"
                src={`${userInfo.profileImg}`}
              ></ProfileImg>
            ) : (
              <ProfileBasic className="ring-2 ring-white">
                <IoPerson size={15} color="white" />
              </ProfileBasic>
            )}

            <Link to={"/mypage"}>
              <p>{nickname}</p>
            </Link>
          </>
        ) : (
          <LoginButton onClick={handleLoginBtnClick}>로그인</LoginButton>
        )}
      </HomeTopBar>
      <TitleWrapper>
        <TitleDesc className="font-medium text-sm">
          시장가자! 근처에 있는
        </TitleDesc>
        <p>주차장</p>
        <p>찾아줘🚘</p>
      </TitleWrapper>
      <div>
        <RegionUl>
          {regionList.map((item, index) => (
            <RegionButton
              key={index}
              onClick={() => {
                item === "전국" ? navigate("/") : navigate(`/${item}`);
              }}
            >
              <RegionItemLi
                className={`${
                  city === item ? "bg-theme-color text-white" : "bg-slate-100"
                } ${
                  item === "전국" && city === undefined
                    ? "bg-theme-color text-white"
                    : ""
                }`}
              >
                {item}
              </RegionItemLi>
            </RegionButton>
          ))}
        </RegionUl>
      </div>
      <MarketTitle>Traditional Market 🥬</MarketTitle>
      <MarketListWrapper>
        <MarketList />
      </MarketListWrapper>
      <Nav />
    </>
  );
};

export default HomePage;

const HomeTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 3.5rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin: 0 auto;
  background-color: white;
  z-index: 20;
`;

const ProfileImg = styled.img`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  object-fit: cover;
  margin-right: 1rem;
`;

const ProfileBasic = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: rgb(226 232 240);
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: rgb(17 24 39);
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid rgb(229 231 235);
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:hover {
    background-color: rgb(243 244 246);
    color: rgb(29 78 216);
  }
`;

const TitleWrapper = styled.div`
  margin-top: 3.5rem;
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 2.25rem;
`;

const TitleDesc = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const RegionUl = styled.ul`
  margin: 2.5rem 0;
  display: flex;
  white-space: nowrap;
  overflow: auto;
`;

const RegionButton = styled.button`
  margin-right: 1rem;
`;

const RegionItemLi = styled.li`
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
`;

const MarketTitle = styled.div`
  font-weight: 500;
  margin-bottom: 1.75rem;
`;

const MarketListWrapper = styled.div`
  margin-bottom: 7rem;
`;
