import { Link, useNavigate } from "react-router-dom";
import Nav from "../../components/common/Nav";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import useUserState from "../../hooks/userUserState";
import { useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";

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
      <div className="text-center font-semibold my-9">profile</div>
      <div className="flex flex-col items-center">
        {userState.profileImg ? (
          <>
            <img
              className="w-32 h-32 rounded-full object-cover"
              src={userState.profileImg}
              alt="프로필이미지"
            />
          </>
        ) : (
          <div className="w-32 h-32 rounded-full bg-slate-200 flex items-center justify-center">
            <IoPerson size={70} color="white" />
          </div>
        )}
        <p className="mt-5 mb-10 font-semibold text-2xl">
          {userState.nickname}
        </p>
        <div>
          <Link to={"/editprofile"}>
            <div className="w-72 h-16 m-auto bg-slate-100 flex items-center rounded-2xl p-2 mb-4">
              <div className="w-12 h-12 bg-zinc-200 rounded-2xl flex items-center justify-center">
                <IoPerson size={25} />
              </div>
              <p className="ml-4 flex-1">유저 프로필 수정</p>
              <div className="mr-2">
                <FaArrowRight />
              </div>
            </div>
          </Link>
          <Link to={"/myreview"}>
            <div className="w-72 h-16 m-auto bg-slate-100 flex items-center rounded-2xl p-2">
              <div className="w-12 h-12 bg-zinc-200 rounded-2xl flex items-center justify-center">
                <MdOutlineRateReview size={25} />
              </div>
              <p className="ml-4 flex-1">내가 쓴 리뷰</p>
              <div className="mr-2">
                <FaArrowRight />
              </div>
            </div>
          </Link>
        </div>
        <button
          className="mt-5 font-semibold text-zinc-300"
          onClick={handleLogoutButton}
        >
          로그아웃
        </button>
      </div>
      <Nav />
    </>
  );
};

export default MyPage;
