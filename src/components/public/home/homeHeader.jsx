/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { FaRegCircleUser } from "react-icons/fa6"
import { useAuthContext } from "../../../contexts/AuthContext"
import UserAvatar from '../../private/common/userAvatar'
const HomeHeader = ({ setProfilePage, userDetails }) => {
  const { key } = useAuthContext()
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-1.5 px-3">
      {userDetails?
       (
        <div
          className="cursor-pointer"
          onClick={() => {
            key === "" ? navigate("/login") : setProfilePage(true)
          }}
        >
         <UserAvatar nameInitial={userDetails?.user?.generated_username? userDetails?.user?.generated_username[0] :  null} size='8' textSize='2xl' />
        </div>
       ):(
       <FaRegCircleUser />
       )
      }
      <h1 className="text-2xl font-bold font-openSans  from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66] bg-gradient-to-r bg-clip-text text-transparent">
        Home
      </h1>
    </div>
  )
}
export default HomeHeader