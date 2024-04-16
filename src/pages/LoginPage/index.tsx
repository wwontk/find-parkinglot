import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";

import { FormEvent } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import useUserState from "../../hooks/userUserState";

const LoginPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useUserState();

  const [email, , handleChangeEmail] = useInput("");
  const [password, , handleChangePassword] = useInput("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          updateUser({
            uid: user.uid,
            email: user.email,
            nickname: user.displayName,
            profileImg: user.photoURL,
            isLogin: true,
          });
        }
      });
      navigate("/");
    });
  };

  return (
    <>
      <div className="mt-14 mb-14 ml-12 font-extrabold text-2xl">
        <p>WELCOME!</p>
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
        <button className="bg-theme-color text-white w-72 p-2 rounded-2xl mt-10">
          login
        </button>
      </form>
      <div className="mt-2 text-sm text-center">
        <span>아직 회원이 아니라면?</span>
        <Link to={"/signup"}>
          <span className="ml-1 font-bold">회원가입</span>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
