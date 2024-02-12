import  { useRef } from "react"
import Reply from "./common/Reply"
import { BsSend } from "react-icons/bs"
export default function Jiggy() {
  const chat = [
    { person: "stranger", reply: "I commented on Figma", isFirstChat: true },
    { person: "you", reply: "Nice, How was it?" },
    { person: "Stranger", reply: "I'll send you some works to work on" },
    { person: "you", reply: "Alright, I'd be anticipating it" },
  ]
  const textareaRef = useRef()
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
      <div className="flex gap-2 px-4 mt-12 items-center">
        <form className="bg-[#D03631] items-center rounded-[1.5rem] py-2 px-6 flex gap-3">
          <textarea
            placeholder="Message"
            // ref={textareaRef}
            onChange={(e) =>
              (e.target.rows = e.target.textLength >= 20 ? "2" : "1")
            }
            rows="1"
            // rows={textareaRef.current.textLength >= 20 ? "2" : "1"}
            className=" font-['Mulish'] resize-none break-words focus:outline-none p-0 bg-transparent w-full"
          />
          <button type="submit" className=" mt-1 ml-auto h-fit z-10">
            <BsSend className="rotate-[45deg] fill-[#9398A7]" />
          </button>
        </form>
        <button className="bg-[#F01D1D] px-8 opacity-90 py-1 rounded-lg">
          Skip
        </button>
      </div>
    </div>
  )
}