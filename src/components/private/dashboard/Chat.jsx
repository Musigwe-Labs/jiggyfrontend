import { FaArrowLeft, FaEllipsisV } from "react-icons/fa"
import Reply from "../../common/Reply"
import { useNavigate } from "react-router-dom"
export default function Chat({ friend, profilePic, chat }) {
  const navigate = useNavigate()
  return (
    <div>
      <nav className="flex items-center px-8 py-6">
        <button className="pr-6" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <img src="src/assets/profile_pics/pic1.png" className="w-[26px] h-[26px] lg:w-12 lg:h-12" />
        <div className="pl-4">
          <h5 className="text-lg lg:text-xl">Anonymous</h5>
        </div>
        <button className="ml-auto">
          <FaEllipsisV />
        </button>
      </nav>
      <p className="text-[#337C11] text-center">
        Your chat is encrypted feel free to do as you wish
      </p>
      <section>
        <time className="text-center block my-4">1 FEB 12:00</time>
        <div className="px-8 flex flex-col gap-4">
          <Reply reply={"I came over to checkmate you progress in the Jiggy app we are working on"} isFirstChat={true} />
          <Reply
            reply={
              "I came over to checkmate you progress in the Jiggy app we are working on"
            }
            person={"you"}
          />
          <Reply reply={"comment"} person={"you"} />
          <Reply reply={"comment"} />
        </div>
      </section>
      <input type="text" />
    </div>
  )
}