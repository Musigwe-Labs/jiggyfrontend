import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Friends from "../../Friends";
import Jiggy from "../../Jiggy";
import HomeFooter from "../../public/home/homeFooter";

export default function Messages() {
  const [selectedTab, setSelectedTab] = useState("friends");
  return (
    <div className="text-white pt-16">
      <div className="flex justify-between items-center px-8 py-6">
        <h1 className="font-[600] text-[28px] leading-[42px]">Messages</h1>
        <button>
          <FaSearch className="text-[1.5rem]" />
        </button>
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
      <HomeFooter />
    </div>
  );
}
