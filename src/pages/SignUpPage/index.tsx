import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, , handleChangeEmail] = useInput("");
  const [password, , handleChangePassword] = useInput("");
  const [passwordCheck, , handleChangePasswordCheck] = useInput("");
  const [nickname, , handleChangeNickname] = useInput("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: nickname,
        }).then(() => {
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mt-14 mb-14 ml-12 font-extrabold text-2xl">
        <p>CREATE</p>
        <p>ACCOUNT!</p>
      </div>
      <form className="flex-col w-72 m-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          className="border w-72 p-2 rounded-2xl mb-4"
          placeholder="email"
          value={email}
          onChange={handleChangeEmail}
        ></input>
        <input
          type="password"
          className="border w-72 p-2 rounded-2xl mb-4"
          placeholder="password"
          value={password}
          onChange={handleChangePassword}
        ></input>
        <input
          type="password"
          className="border w-72 p-2 rounded-2xl mb-4"
          placeholder="passwordCheck"
          value={passwordCheck}
          onChange={handleChangePasswordCheck}
        ></input>
        <input
          type="text"
          className="border w-72 p-2 rounded-2xl mb-4"
          placeholder="nickname"
          value={nickname}
          onChange={handleChangeNickname}
        ></input>
        <button className="bg-theme-color text-white w-72 p-2 rounded-2xl mt-10">
          sign up
        </button>
      </form>
      <div className="mt-2 text-sm text-center">
        <span>이미 회원이라면?</span>
        <Link to={"/login"}>
          <span className="ml-1 font-bold">로그인</span>
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
