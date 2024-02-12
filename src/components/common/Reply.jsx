export default function Reply({ reply, person, isFirstChat, isJiggyChat }) {
    let friendChatbg = isFirstChat ? "bg-[#AD2344]" : "bg-[#373E4E]"
  return (
    <div className={`max-w-[min(70%,_30rem)] w-fit ${person === "you" && "ml-auto"}`}>
      {isJiggyChat && (
        <h5 className={`capitalize mb-1 italic font-['Inter'] font-[200] opacity-80 ${person === "you" && "text-right"}`}>
          {person}
        </h5>
      )}
      <div
        className={`py-2  px-4 rounded-[1.3rem] ${
          person === "you" ? "bg-[#7A8194] translate-x-4" : `${friendChatbg} -translate-x-4`
        }`}
      >
        {reply}
      </div>
    </div>
  )
}