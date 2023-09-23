import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Help() {
    const navigate = useNavigate()
  return (
    <div className="px-6 md:px-12 py-8 ">
      <div className="font-bold text-[2rem] mb-6 flex gap-8 items-center">
        <HiArrowLeft
          cursor={"pointer"}
          size={"1.5rem"}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-transparent bg-gradient-to-r bg-clip-text  from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66]">
          Help
        </h1>
      </div>
      <h2 className="text-[#D7AFB6] font-semibold text-2xl ml-[1.5rem]">
        What can we help you with?
      </h2>
    </div>
  );
}

export default Help;
