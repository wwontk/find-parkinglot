import { useNavigate } from "react-router-dom";
import Nav from "../../components/common/Nav";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import useUserState from "../../hooks/userUserState";
import { useEffect } from "react";

const MyPage = () => {
  const navigate = useNavigate();
  const { userState, updateUser } = useUserState();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      alert("로그인을 진행해주세요!");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogoutButton = async () => {
    try {
      await signOut(auth).then(() => {
        updateUser({
          ...userState,
          isLogin: false,
        });
        alert("로그아웃 하였습니다.");
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handleLogoutButton}>로그아웃</button>
      <Nav />
    </>
  );
};

export default MyPage;
