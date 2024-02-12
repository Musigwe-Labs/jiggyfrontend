import {memo} from 'react'
import { ReplyComment } from "./replyComment"
import Replies from "./replies"
function SingleComment({comment}){
  return (
    <>
      {comment && 
        <div
          className="text-base bg-[#1717171a] mt-2 px-3 rounded-xl"
        >
          <div className="flex items-start mb-1">
            <div className="px-3 py-1 rounded-3xl mr-2 bg-gray-700">
              {comment.user?.at(0)?.toUpperCase()}
            </div>
            <div>
              <h4 className="text-white mr-1 text-base font-bold">
                @{comment.user}
              </h4>
              <p className="text-base ">{comment.content}</p>
              <ReplyComment commentId={comment.id} />
              {comment.replies?.length > 0 && (
                <Replies replies={comment.replies} />
              )}
            </div>
          </div>
        </div>
      } 
    </> 
  )
}
export default memo(SingleComment)