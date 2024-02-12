import { FaRegBell as BellIcon } from "react-icons/fa"
import { Link } from "react-router-dom"
const NotificationButton = () => {
  return (
    <div
      className="pointer text-[#f33f5e] hover:text-[blue] w-12 h-12 flex justify-center items-center" >
      <Link to="/notifications">
        <BellIcon size={20} />
      </Link>
    </div>
  )
}
export default NotificationButton