/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import CommentInfo from "./commentInfo";
import Gist from "./gist";
import GistLinks from "./gistLinks";
import profile_pic from "../../../assets/profile_pics/pic1.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "../../../services/axios";
import { IoIosSend } from "react-icons/io";
import _ from "lodash";

const Comment = ({ post, setSelectedPost }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputHeight, setInputHeight] = useState("35px");
  const maxInputHeight = 220; // Adjust this value as needed

  const { key } = useContext(AuthContext);

  const headers = {
    Authorization: `Token ${key}`,
  };
  const handleInputChange = (event) => {
    const { value, scrollHeight } = event.target;
    setInputValue(value);

    // Calculate the new height within the maximum limit
    const newHeight = Math.min(scrollHeight, maxInputHeight);

    setInputHeight(`${newHeight}px`); //Update the height based on newHeight
  };
  useEffect(() => {
    if (inputValue === "") {
      setInputHeight("35px");
    }
  }, [inputValue]);

  const handleSendComment = async () => {
    try {
      const data = { post: post.id, content: inputValue };
      await axios.post("annon/posts/comment/", data, { headers });
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };
  const throttledApiRequest = _.throttle(handleSendComment, 2000);

  return (
    <div className="z-50 min-h-screen pt-4 px-3 flex flex-col">
      <div className="flex align-center">
        <FaArrowLeftLong
          size={25}
          onClick={() => setSelectedPost(null)}
          className="cursor-pointer"
        />
        <h1 className="text-3xl ml-6 text-center font-bold from-[#ff0000] via-[#ff004c] to-[#0028ad] bg-gradient-to-br bg-clip-text text-transparent">
          Comment
        </h1>
      </div>
      <div className="z-10 md:mx-10 p-3">
        <CommentInfo
          school={post.user.school}
          name={post.user.generated_username}
        />
        <Gist content={post.content} images={post.images} />
        <GistLinks post={post} />
      </div>
      <div className="mt-4 mb-10">
        <p className="px-3 my-3 text-gray-400">
          {post.comments.length} comments
        </p>
        <div className="mx-2 flex-1 overflow-auto border-l border-gray-500">
          {post.comments.map((comment) => {
            return (
              <div
                key={comment.created_at}
                className="text-base bg-[#1717171a] mt-2 px-3 rounded-xl"
              >
                <div className="flex items-center mb-1">
                  <img
                    className="w-6 rounded-3xl mr-2"
                    src={profile_pic}
                    alt="profile-img"
                  />
                  <h4 className="text-white mr-1 text-base font-bold">
                    {comment.user.generated_username}
                  </h4>
                </div>
                <p className="text-base">
                  <span className="text-[14.5px] text-blue-500 mr-2 font-light">
                    @{post.user.generated_username}
                  </span>
                  {comment.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          throttledApiRequest;
        }}
        className="mt-auto w-[100%] border-t border-gray-500 left-0 relative bottom-0 py-2"
      >
        <textarea
          //   style={{ height: inputHeight }}
          className="resize-none p-2 pr-14 block w-full border-b bg-transparent rounded-md  focus:outline-none "
          placeholder="Comment your thought"
          rows={{ inputHeight }}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="ml-3 rounded-xl  font-bold text-sm absolute top-[38%] right-4"
        >
          <IoIosSend size={21} color="ff0000" />
        </button>
      </form>
    </div>
  );
};
export default Comment;
