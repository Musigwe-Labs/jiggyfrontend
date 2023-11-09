import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const Replies = ({ replies }) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <div>
      <button
        onClick={() => setShowReplies(!showReplies)}
        className="text-[#ff0000] text-sm flex items-center gap-1 transition-all duration-200 ease-linear hover:bg-gray-900 px-3 rounded-3xl py-1"
      >
        <FaCaretDown /> {replies.length}{" "}
        {replies.length > 1 ? "replies" : "reply"}{" "}
      </button>
      <div
        style={{
          clipPath: `${
            showReplies
              ? "polygon(0 0, 100% 0, 100% 0, 0 0)"
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          }`,
          height: `${showReplies ? "0" : "auto"}`,
        }}
        className={`ml-5  transition-all flex flex-col gap-2 duration-300 ease-linear overflow-hidden`}
      >
        {replies.map((reply, index) => {
          return (
            <div className="flex items-start my-2 gap-1" key={index}>
              <div
                className="px-3 py-1 rounded-3xl mr-2 bg-gray-700"
                // src={profile_pic}
                alt="profile-img"
              >
                {reply.user[0].toUpperCase()}
              </div>
              <div>
                <h4 className="text-white mr-1 text-base font-bold">
                  @{reply.user}
                </h4>
                <p className="text-base">{reply.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Replies;
