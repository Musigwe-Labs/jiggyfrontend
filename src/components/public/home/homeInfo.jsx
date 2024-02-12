/* eslint-disable react/prop-types */
import { AiOutlineMore } from "react-icons/ai"
import timeGap from "../../../services/dateCheck"
import UserAvatar from "../../private/common/userAvatar"
const HomeInfo = (props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
      <UserAvatar nameInitial={props.name[0]} size='7' textSize='xl' classes='mr-2' />
      <h4 className="text-white mr-2 text-[0.8rem] font-ibmPlexSans font-semibold">{props.name}</h4>
        <span className="border border-gray-400"></span>
        <p className="px-1 text-[0.85rem] text-[#787C7E] font-ibmPlexSans ">
          {props.school === null ? "ballers" : props.school.school_acronym}
        </p>
        <span className="border border-gray-400"></span>
        <span className="text-sm text-[#787C7E] pl-2 sm:pl-6">
          {timeGap(props.created_at)}
        </span>
      </div>
      <AiOutlineMore className="cursor-pointer" />
    </div>
  )
}
export default HomeInfo