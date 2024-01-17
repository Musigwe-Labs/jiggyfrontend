import { FaRegBell as BellIcon } from "react-icons/fa";

import { Link } from "react-router-dom";

const NotificationButton = () => {
  return (
    <div
      className="fixed top-6 right-12 cursor-pointer text-[#f33f5e]
                   hover:text-[#f33f5e] w-12 h-12 flex justify-center items-center grow"
    >
      <Link to="/notifications">
        <BellIcon size={20} />
      </Link>
    </div>
  );
};
export default NotificationButton;
