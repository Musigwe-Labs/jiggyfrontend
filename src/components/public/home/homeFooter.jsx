import { useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { AiFillHome as HomeIcon } from "react-icons/ai"
import { FaRegBell as BellIcon } from "react-icons/fa"
import { BsEnvelope as MessageIcon } from "react-icons/bs"
const HomeFooter = () => {
  const location = useLocation();
  const urlpath = location.pathname;
  const navigate = useNavigate();
  const navlinks = [
    {
      id: 0,
      url: "/home",
      icon: <HomeIcon size={20} />,
    },
    {
      id: 1,
      url: "/messages",
      icon: <MessageIcon size={20} />,
    },
    {
      id: 2,
      url: "/notifications",
      icon: <BellIcon size={20} />,
    },
  ]
  function handleClick(url) {
    const tab = urlpath.slice(1);
    navigate(url);
  }
  return (
    <div className="w-full hidden z-10 items-center  justify-between  bottom-0 border-t border-y-[#4B5563] bg-black py-3 px-2 fixed h-20 gap-8">
      {navlinks.map((nav) => {
        return (
          <NavLink
            to={nav.url}
            key={nav.id}
            className={({ isActive }) =>
              isActive
                ? ` cursor-pointer ${
                    urlpath === nav.url ? "text-[#f33f5e]" : "text-gray-400"
                  } hover:text-[#f33f5e]  w-12 h-10 flex justify-center items-center border-b-[2px] grow`
                : `cursor-pointer ${
                    urlpath === nav.url ? "text-[#f33f5e]" : "text-gray-400"
                  } hover:text-[#f33f5e]  w-12 h-10 flex justify-center items-center border-b-[2px] border-black grow`
            }
            onClick={() => handleClick(nav.url)}
          >
            {nav.icon}
          </NavLink>
        )
      })}
    </div>
  )
}
export default HomeFooter