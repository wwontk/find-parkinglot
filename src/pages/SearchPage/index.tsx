import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../../components/common/Nav";
import { useState } from "react";
import styled from "@emotion/styled";

const SearchPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/list?object=${keyword}`);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1"
          placeholder="시장을 검색해보세요."
          onChange={handleOnChange}
        />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 opacity-70 ml-2"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Form>

      <Outlet />
      <Nav />
    </>
  );
};

export default SearchPage;

const Form = styled.form`
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  border-width: 1px;
  display: flex;
  padding: 0.5rem;
`;
