import { useState } from "react"
import Messages from "./Messages"
import Chat from "./Chat"
export default function MessagesLayout() {
  let [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const selectedFriend = useState({})
  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth < 640);
  })
  return (
    <div>
      {isMobile ? (<Messages />):(<div className="grid grid-cols-[1.5fr_3fr]">
          <Messages />
          <Chat />
        </div>
      )}
    </div>
  )
}