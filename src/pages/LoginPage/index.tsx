import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { FormEvent, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import styled from "@emotion/styled";
import useUserStore from "../../stores/useUserStore";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, , handleChangeEmail] = useInput("");
  const [password, , handleChangePassword] = useInput("");

  const [allCheck, setAllCheck] = useState(false);

  const [loginError, setLoginError] = useState(false);

  const { setUserInfo } = useUserStore();

  useEffect(() => {
    if (email && password) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, String(email), String(password));
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserInfo({
            uid: user.uid,
            email: user.email,
            nickname: user.displayName,
            profileImg: user.photoURL,
            isLogin: true,
          });
        }
      });
      navigate("/");
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <>
      <TextWrapper>
        <p>WELCOME!</p>
      </TextWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <LoginInput
          type="email"
          placeholder="email"
          value={`${email}`}
          onChange={handleChangeEmail}
        ></LoginInput>
        <LoginInput
          type="password"
          placeholder="password"
          value={`${password}`}
          onChange={handleChangePassword}
        ></LoginInput>
        {loginError && (
          <ErrMsg>이메일 혹은 비밀번호가 올바르지 않습니다.</ErrMsg>
        )}
        <SubmitButton disabled={!allCheck}>login</SubmitButton>
      </LoginForm>
      <SubTextWrapper>
        <span>아직 회원이 아니라면?</span>
        <Link to={"/signup"}>
          <SignupText>회원가입</SignupText>
        </Link>
      </SubTextWrapper>
    </>
  );
};

export default LoginPage;

const TextWrapper = styled.div`
  margin: 3.5rem 0;
  margin-left: 3rem;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const LoginForm = styled.form`
  flex-direction: column;
  width: 18rem;
  margin: 0 auto;
`;

const LoginInput = styled.input`
  width: 18rem;
  padding: 0.5rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  border-width: 1px;
`;

const ErrMsg = styled.p`
  color: rgb(220 38 38);
`;

const SubmitButton = styled.button`
  background-color: rgb(24 37 61);
  color: white;
  width: 18rem;
  padding: 0.5rem;
  border-radius: 1rem;
  margin-top: 2.5rem;
  &:disabled {
    background-color: rgb(203 213 225);
  }
`;

const SubTextWrapper = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
`;

const SignupText = styled.span`
  margin-left: 0.25rem;
  font-weight: 700;
`;
