import React, { useRef, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const navigate = useNavigate();
  const rangeRef = useRef(0);
  const [rangeValue, setRangeValue] = useState(4);
  console.log(rangeRef.current.value);
  const emojis = [
    { emoji: "😖", value: "Worst" },
    { emoji: "😧", value: "Not Good" },
    { emoji: "😐", value: "Fine" },
    { emoji: "😃", value: "Look Good" },
    { emoji: "😍", value: "Very Good" },
  ];
  return (
    <div className="px-6 md:px-12 py-8 ">
      <div className="font-bold text-[2rem] mb-6 flex gap-8 items-center">
        <HiArrowLeft
          cursor={"pointer"}
          size={"1.5rem"}
          onClick={() => navigate(-1)}
        />
        <h1 className="text-transparent bg-gradient-to-r bg-clip-text  from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66]">
          Feedback
        </h1>
      </div>
      <p className="text-[#907378] ml-[1.5rem]">
        Kindly share your experience and features you would like us to add, to
        help us serve you better.
      </p>
      <form className="my-12">
        <label className="block text-[#54575A] text-[1.2rem] font-semibold">
          Email Address
        </label>
        <input
          type="email"
          placeholder="xyz123@gmail.com"
          className="border-[solid_#888888] mb-8 border-[1px] bg-[#453232] w-full px-5 py-3 rounded-xl mt-3"
        />
        <label
          for="experience"
          className="block text-[#54575A] text-[1.2rem] font-semibold"
        >
          Share your experience in scaling
        </label>
        <div className="flex justify-between">
          {emojis.map(({ emoji, value }, index) => (
            <div
              className="flex flex-col items-center my-4"
              style={{
                opacity: rangeValue == index ? "1" : ".2",
                transition: "all .3s ease",
              }}
            >
              <span className="text-[2.5rem]">{emoji}</span>
              <span className="text-[#A5E0DD] text-sm font-semibold">
                {value}
              </span>
            </div>
          ))}
        </div>
        <input
          type="range"
          max={4}
          id="experience"
          className="w-full mb-8 custom-slider cursor-pointer transition-all duration-300"
          value={rangeValue}
          onChange={() => setRangeValue(rangeRef.current.value)}
          ref={rangeRef}
        />
        <textarea
          placeholder="Add your Comments..."
          rows={"5"}
          className="bg-[#453232] w-full mb-8 px-4 py-3 rounded-2xl border-[#888888] border-[1px]"
        />
        <input
          type="submit"
          value={"SUBMIT"}
          className="bg-[#F33F5E] w-full py-3 text-[1.3rem] font-semibold rounded-2xl cursor-pointer"
        />
      </form>
    </div>
  );
}

export default Feedback;
