import { HiOutlineRefresh } from "react-icons/hi"
import UserAvatar from './userAvatar'
const PrivacyHeader = ({generated_username}) => {
  return (
    <section className="flex flex-col items-center my-10">
      <UserAvatar nameInitial={generated_username? generated_username[0]: null} size='30' textSize='7xl' />
      <h4 className="flex items-center gap-2 mt-6">
        <span className="text-2xl">
        {generated_username}
        </span>
          <HiOutlineRefresh fontWeight={"700"} className="text-blue-300" />
      </h4>
      <a href="https://jiggy.com/annoymous" className="text-sm mt-2 text-blue-800">https://jiggy.com/annoymous</a>
    </section>
  )
}
export default PrivacyHeader