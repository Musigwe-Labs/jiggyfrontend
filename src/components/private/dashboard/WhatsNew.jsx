import { HiArrowLeft } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
import Star from "../common/Star"
function WhatsNew() {
  const navigate = useNavigate()
  return (
    <div className="px-6 md:px-12 py-8 ">
      <div className=" mb-6 flex gap-8 items-center">
        <HiArrowLeft
          cursor={"pointer"}
          size={"1.5rem"}
          onClick={() => navigate(-1)}
        />
        <h1 className="flex items-center gap-2">
          <span className="font-bold text-[2rem] text-transparent bg-gradient-to-r bg-clip-text  from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66]">
            What's New
          </span>{" "}
          <Star />
        </h1>
      </div>
      <p className="text-[#907378] ml-[1.5rem]">
        latest feature available on the app
      </p>
      <div className="my-8">
        <h2 className="text-[#D7AFB6] font-semibold text-2xl">Features</h2>
        <div className="mt-4 ml-4">
          <div className="flex items-center gap-2 mb-2">
            <Star />
            <h3 className="text-lg font-semibold">Message Section</h3>
          </div>
          <p className="text-[#907378]">
            This feature allows you to text other user
          </p>
        </div>
        <div className="mt-4 ml-4">
          <div className="flex items-center gap-2 mb-2">
            <Star />
            <h3 className="text-lg font-semibold">Notification</h3>
          </div>
          <p className="text-[#907378]">
            This feature allows you to text other user
          </p>
        </div>
      </div>
    </div>
  )
}
export default WhatsNew