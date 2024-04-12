import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../../components/common/Nav";
import { useState } from "react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/search/list?object=${keyword}`);
  };

  return (
    <>
      <label className="input input-bordered flex items-center gap-2 mt-1">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={handleOnChange}
        />
        <button onClick={handleOnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </label>
      <Outlet />
      <Nav />
    </>
  );
};

export default SearchPage;
