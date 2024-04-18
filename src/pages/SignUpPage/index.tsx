import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { FormEvent, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { ValidCheckType } from "../../types/User";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, , handleChangeEmail] = useInput("");
  const [password, , handleChangePassword] = useInput("");
  const [passwordCheck, , handleChangePasswordCheck] = useInput("");
  const [nickname, , handleChangeNickname] = useInput("");

  const [allCheck, setAllCheck] = useState(false);

  const CheckInit = {
    status: false,
    msg: "",
  };

  const [validEmail, setValidEmail] = useState<ValidCheckType>(CheckInit);
  const [validPassword, setValidPassword] = useState<ValidCheckType>(CheckInit);
  const [validPasswordCheck, setValidPasswordCheck] =
    useState<ValidCheckType>(CheckInit);

  const isValidEmail = (email: string) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regExp.test(email);
  };

  const isValidPassword = (password: string) => {
    const regExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regExp.test(password);
  };

  useEffect(() => {
    if (!email) return;
    if (isValidEmail(email)) {
      setValidEmail({ status: true, msg: "올바른 형식의 이메일 입니다." });
    } else {
      setValidEmail({ status: false, msg: "올바른 형식의 이메일이 아닙니다." });
    }
  }, [email]);

  useEffect(() => {
    if (!password) return;
    if (isValidPassword(password)) {
      setValidPassword({ status: true, msg: "올바른 형식의 비밀번호 입니다." });
    } else {
      setValidPassword({
        status: false,
        msg: "올바른 형식의 비밀번호가 아닙니다.",
      });
    }
  }, [password]);

  useEffect(() => {
    if (!passwordCheck) return;
    if (passwordCheck === password) {
      setValidPasswordCheck({ status: true, msg: "비밀번호가 일치합니다." });
    } else {
      setValidPasswordCheck({
        status: false,
        msg: "비밀번호가 일치하지 않습니다.",
      });
    }
  }, [password, passwordCheck]);

  useEffect(() => {
    if (
      validEmail.status &&
      validPassword.status &&
      validPasswordCheck.status &&
      nickname
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [
    validEmail.status,
    validPassword.status,
    validPasswordCheck.status,
    nickname,
  ]);

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
        <div className="mb-4">
          <input
            type="email"
            className="border w-72 p-2 rounded-2xl"
            placeholder="email"
            value={email}
            onChange={handleChangeEmail}
          ></input>
          <p
            className={`${
              validEmail.status ? "text-green-500" : "text-red-600"
            }`}
          >
            {email && validEmail.msg}
          </p>
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="border w-72 p-2 rounded-2xl"
            placeholder="password"
            value={password}
            onChange={handleChangePassword}
          ></input>
          <p
            className={`${
              password
                ? validPassword.status
                  ? "text-green-500"
                  : "text-red-600"
                : "text-gray-300"
            }`}
          >
            {!password
              ? "*영문자+특수문자+숫자를 포함하여 8자 이상 입력해주세요."
              : validPassword.msg}
          </p>
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="border w-72 p-2 rounded-2xl"
            placeholder="passwordCheck"
            value={passwordCheck}
            onChange={handleChangePasswordCheck}
          ></input>
          <p
            className={`${
              validPasswordCheck.status ? "text-green-500" : "text-red-600"
            }`}
          >
            {passwordCheck && validPasswordCheck.msg}
          </p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="border w-72 p-2 rounded-2xl"
            placeholder="nickname"
            value={nickname}
            onChange={handleChangeNickname}
          ></input>
        </div>
        <button
          className="bg-theme-color text-white w-72 p-2 rounded-2xl mt-10 disabled:bg-slate-300"
          disabled={!allCheck}
        >
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
