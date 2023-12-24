import { useState, useLayoutEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Friends from "../../Friends";
import Jiggy from "../../Jiggy";
import HomeFooter from "../../public/home/homeFooter";
import { setScrollPosition } from "../../../utils/scrollPage";

export default function Messages() {
  const [selectedTab, setSelectedTab] = useState("friends");

  // useLayoutEffect(()=>{
  //   setScrollPosition('home')
  // })

  return (
    <>
    <div className="text-white grow mb-20">
        <div className="flex justify-between items-center px-8 py-6">
          <h1 className=" nav font-bold text-[28px] leading-[42px] bg-gradient-to-l from-[#B416FE40] via-[#FF008A62] to-[#F33F5E] bg-clip-text text-transparent">Messages</h1>
          <button>
            <FaSearch className="text-[1.5rem]" />
          </button>
        </div>
        <div className="text-white px-8 pb-6">
          Coming soon...
        </div>
        <div className="grid grid-cols-[repeat(2,_1fr)] place-items-center text-center overflow-hidden tabs ">
          <p
            className={`${
              selectedTab === "friends" && "active"
            } tab transition-all duration-300 ease-in-out cursor-pointer hover:text-[#00CCCC] w-fit`}
            onClick={() => setSelectedTab("friends")}
          >
            All
          </p>
          <p
            className={`${
              selectedTab === "jiggy" && "active"
            } tab transition-all duration-300 ease-in-out cursor-pointer hover:text-[#00CCCC] w-fit`}
            onClick={() => setSelectedTab("jiggy")}
          >
            Jiggy
          </p>
        </div>
        <div className="bg-[#0B0B09]">
          {selectedTab === "friends" ? <Friends /> : <Jiggy />}
        </div>
    </div>

    <HomeFooter />

    </>
  );
}
