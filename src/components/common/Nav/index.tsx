import { TiHome } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { IoChatbubbleEllipses } from "react-icons/io5";
import styled from "@emotion/styled";

const navItem = [
  { id: 1, path: "/", icon: <TiHome size={25} /> },
  { id: 2, path: "/chat", icon: <IoChatbubbleEllipses size={25} /> },
  {
    id: 3,
    path: "/search",
    icon: <IoSearchSharp size={25} />,
  },
  {
    id: 4,
    path: "/mypage",
    icon: <BsPersonFill size={25} />,
  },
];

const Nav = () => {
  return (
    <NavConatiner>
      {navItem.map((nav) => (
        <NavLink
          key={nav.id}
          to={nav.path}
          className={({ isActive }) =>
            isActive ? "text-white" : "text-point-color"
          }
        >
          {nav.icon}
        </NavLink>
      ))}
    </NavConatiner>
  );
};

export default Nav;

const NavConatiner = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: auto;
  height: 6rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: rgb(24 37 61);
  max-width: 24rem;
  @media (min-width: 800px) {
    max-width: 50rem;
  }
`;
