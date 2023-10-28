import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { AiFillHome as HomeIcon } from "react-icons/ai";
import { FaRegBell as BellIcon } from "react-icons/fa";
import { BsEnvelope as MessageIcon } from "react-icons/bs";

const HomeFooter = () => {
  const location = useLocation();
  const urlpath = location.pathname;
  const [clickedIcon, setCliCkedIcon] = useState(null);

  const navlinks = [
    {
      id: 0,
      url: "/home",
      icon: <HomeIcon size={25} />,
    },
    {
      id: 1,
      url: "#",
    //   url: "/messages",
      icon: <MessageIcon size={25} />,
    },
    {
      id: 2,
      // url: "/notifications",
      url: "#",
      icon: <BellIcon size={25} />,
    },
  ];

  //my styles
  // // ]
  //     const navlinks = [
  //     {
  //         id: 0,
  //         url: "/home",
  //         icon: HomeIcon
  //     },
  //     {
  //         id: 1,
  //         url: "/messages",
  //         icon: Envelope
  //     },
  //     {
  //         id: 2,
  //         url: "/notifications",
  //         icon: BellIcon
  //     }
  // ]

  function handleClick() {
    // setIcon
  }

  return (
    <div className="w-full flex z-10 items-center  justify-between  bottom-0 border-t border-y-[#4B5563] bg-black py-3 px-2 fixed h-20">
      {navlinks.map((nav) => {
        return (
          <NavLink
            to={nav.url}
            key={nav.id}
            className={({ isActive }) =>
              isActive
                ? ` cursor-pointer ${
                    urlpath === nav.url ? "text-[#f33f5e]" : "text-gray-400"
                  } hover:text-[#f33f5e]  w-16 h-12 flex justify-center items-center border-b-[2px]`
                : `cursor-pointer ${
                    urlpath === nav.url ? "text-[#f33f5e]" : "text-gray-400"
                  } hover:text-[#f33f5e]  w-16 h-12 flex justify-center items-center border-b-[2px] border-black`
            }
            aria-disabled
            onClick={handleClick}
          >
            {nav.icon}
          </NavLink>
        );
      })}
      {/*<Bell />*/}
    </div>

    // <div className='w-full flex z-10 justify-evenly fixed bottom-0 border-t border-y-[#4B5563] bg-black py-3 '>
    //     {
    //         navlinks.map(nav => {
    //             return(
    //                 <Link
    //                     to={nav.url}
    //                     key={nav.id}
    //                     className={`cursor-pointer ${urlpath === nav.url ? 'text-[#f33f5e]' : 'text-gray-400'} hover:text-[#f33f5e]`}
    //                 >
    //                     {nav.icon}
    //                 </Link>
    //             )
    //         })
    //     }

    // // </div>
    // <div>
    //     <img  src={HomeIcon} />

    // </div>
  );
};

export default HomeFooter;
