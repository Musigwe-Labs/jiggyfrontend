import React from "react";
import Reply from "./common/Reply";
import { BsSend } from "react-icons/bs";
export default function Jiggy() {
  const chat = [
    { person: "stranger", reply: "I commented on Figma", isFirstChat: true },
    { person: "you", reply: "Nice, How was it?" },
    { person: "Stranger", reply: "I'll send you some works to work on" },
    { person: "you", reply: "Alright, I'd be anticipating it" },
  ];
  return (
    <div className=" py-4">
      <div className="">
        <h3 className="text-[#E11212] px-8 font-['inter'] font-[600] border-[#C4C4C447] border-b-[1px] text-[2rem] ">
          Chat with Stranger
        </h3>
      </div>
      <p className="opacity-80 px-8 pt-4 pb-2">
        <em>You are chatting with a stranger now!!</em>
      </p>
      <div className="grid gap-4 px-8">
        {chat.map(({ person, reply, isFirstChat }, index) => (
          <Reply
            person={person}
            key={index}
            reply={reply}
            isFirstChat={isFirstChat}
            isJiggyChat={true}
          />
        ))}
      </div>
      <form>
        <div className="relati">
          <input
            type="text"
            placeholder="Message"
            className="bg-[#D03631] rounded-[1.5rem] py-2 font-['Mulish'] px-8"
          />
          <button type="submit" className=" -translate-x-12 my-auto h-fit z-10">
            <BsSend className="rotate-[45deg] fill-[#9398A7]" />
          </button>
          <button className="bg-[#F01D1D] px-8 opacity-90 py-1 rounded-lg">Skip</button>
        </div>
      </form>
    </div>
  );
}
