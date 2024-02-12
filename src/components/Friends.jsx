import friendsDummyApi from "../utils/friendsDummyApi.json"
import { useNavigate, useParams } from "react-router-dom"
export default function Friends() {
  return (
    <div className=" p-4 border-[#C4C4C447] border-t-[1px]">
      <ul className="grid gap-8">
        {friendsDummyApi.map(
          ({ profilePic, friend, last_message, message_time }, index) => (
            <Friend
              profilePic={profilePic}
              friend={friend}
              last_message={last_message}
              message_time={message_time}
              key={index}
            />
          )
        )}
      </ul>
    </div>
  )
}
const Friend = ({ profilePic, friend, last_message, message_time }) => {
  let { friend_name } = useParams();
  let navigate = useNavigate();
  let openChat = () => {
    friend_name = friend;
    navigate(`/chat/${friend_name}`)
  }
  return (
    <li className="grid grid-cols-[1fr_4fr_1fr] gap-4" onClick={openChat}>
      <div>
        <img
          src={`src/assets/profile_pics/${profilePic}`}
          className="w-[3.1rem] h-[3.15rem] shadow-[4px_4px_24px_0px_#00000073"
        />
      </div>
      <div>
        <h4 className="text-[15px]">{friend}</h4>
        <p className="dull_color">{last_message}</p>
      </div>
      <p className="dull_color">{message_time}</p>
    </li>
  )
}