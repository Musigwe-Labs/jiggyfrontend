import { useContext, useState } from "react"
import { FaReplyAll } from "react-icons/fa"
import { AuthContext } from "../../../contexts/AuthContext"
import axios from "../../../services/axios"
import _ from "lodash"

export const ReplyComment = ({commentId}) => {
  const [openReplyComment, setopenReplyComment] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const { key } = useContext(AuthContext)
  const headers = {
    Authorization: `Token ${key}`,
  }
  const handleSendReply = async () => {
    try {
      if (inputValue) {
        const data = { content: inputValue, comment: commentId }
        await axios.post("annon/replies/create/", data, { headers })
        setInputValue("")
        setopenReplyComment(false)
      }
    } catch (error) {
    }
  }
  const throttledApiRequest = _.throttle(handleSendReply, 2000)
  return (
    <div className="my-2">
      {!openReplyComment ? (
        <button
          onClick={() => setopenReplyComment(true)}
          className="flex text-sm items-center gap-1 transition-all duration-200 ease-linear hover:bg-gray-700 px-3 rounded-3xl py-1"
        >
          <FaReplyAll /> Reply
        </button>
      ) : (
        <div className="w-[95%]  mx-auto transition-all duration-200 ease-linear">
          <textarea
            placeholder="Reply comment"
            className="px-2 py-1 resize-none focus:outline-none w-full bg-transparent border-b-2 mb-2 "
            name=""
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={1}
            id=""
          />
          <div className="flex gap-4">
            <button
              onClick={() => setopenReplyComment(false)}
              className="ml-auto transition-all duration-200 ease-linear hover:bg-gray-700 px-3 rounded-3xl py-1"
            >
              Cancel
            </button>
            <button onClick={throttledApiRequest} className="transition-all duration-200 ease-linear  hover:bg-transparent bg-[#ff0000] px-3 rounded-3xl py-1">
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
