import { TiHome } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const navItem = [
  { id: 1, path: "/", icon: <TiHome size={25} /> },
  {
    id: 2,
    path: "/search",
    icon: <IoSearchSharp size={25} />,
  },
  {
    id: 3,
    path: "/mypage",
    icon: <BsPersonFill size={25} />,
  },
];

const Nav = () => {
  return (
    <nav className="flex justify-around items-center max-w-default w-full m-auto h-24 rounded-t-2xl fixed bottom-0 left-0 right-0 bg-theme-color">
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
    </nav>
  );
};

export default Nav;
