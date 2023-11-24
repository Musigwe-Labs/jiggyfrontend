/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import CommentInfo from "./commentInfo";
import Gist from "./gist";
import GistLinks from "./gistLinks";
import profile_pic from "../../../assets/profile_pics/pic1.png";
import {
  FaArrowLeftLong,
  FaForward,
  FaReply,
  FaReplyAll,
  FaReplyd,
} from "react-icons/fa6";
import axios from "../../../services/axios";
import { IoIosCheckmark, IoIosSend } from "react-icons/io";
import _ from "lodash";
import { FaSpinner } from "react-icons/fa";
import { ReplyComment } from "./replyComment";
import Replies from "./replies";
import { PostSharing } from "./Home";
import { useParams } from "react-router-dom";

const Comment = ({
  // post,
  setSelectedPost,
  reloadPosts,
  setSelectedPostIndex,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputHeight, setInputHeight] = useState("35px");
  const [allComments, setAllComments] = useState([]);
  const [post, setPost] = useState([])
  const [status, setStatus] = useState({
    loading: false,
    succesful: false,
    error: "",
  });
  // const {selectedPostId} = useContext(PostSharing);
  const {id} = useParams();
  useEffect(() => {
    console.log(id);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `annon/posts/${98}/update/`, {headers}
        );
        setAllComments([response.data.results.comments]);
        setPost([response.data.results]);
        
        // setIsRecievedData(false);

        // setIsLoading(false);
      } catch (err) {
        // setError(err.message);
      }
    };
    fetchPosts();
  }, []);
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

  // useEffect(() => {
  //   console.log(post.comments);

  //   if (post) setAllComments(post.comments);
  // }, []);

  useEffect(() => {
    if (inputValue === "") {
      setInputHeight("35px");
    }
  }, [inputValue]);

  const handleSendComment = async () => {
    try {
      if (inputValue) {
        setStatus({ ...status, loading: true });
        const data = { content: inputValue, post: post.id };
        await axios.post("annon/posts/comment/", data, { headers });
        await reloadPosts();
        setInputValue("");

        setStatus({ ...status, loading: false, successful: true });
      }
    } catch (error) {
      setStatus({ ...status, error: error });
    }
  };

  const throttledApiRequest = _.throttle(handleSendComment, 2000);

  return (
    <div className="z-50 min-h-screen pt-4 px-3 flex flex-col">
      {/* <div className="flex align-center">
        <FaArrowLeftLong
          size={25}
          onClick={() => {
            setSelectedPost(null);
            setSelectedPostIndex(null);
          }}
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
          {post.comments.length}{" "}
          {post.comments.length < 1 ? "comment" : "comments"}
        </p>
        <div className="mx-2 flex-1 gap-4 flex flex-col overflow-auto border-l border-gray-500">
          {post.comments.map((comment) => {
            return (
              <div
                key={comment.created_at}
                className="text-base bg-[#1717171a] mt-2 px-3 rounded-xl"
              >
                <div className="flex items-start mb-1">
                  <div className="px-3 py-1 rounded-3xl mr-2 bg-gray-700">
                    {comment.user[0].toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-white mr-1 text-base font-bold">
                      @{comment.user}
                    </h4>
                    <p className="text-base">{comment.content}</p>
                    <ReplyComment commentId={comment.id} />
                    {comment.replies.length > 0 && (
                      <Replies replies={comment.replies} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
          onClick={() => throttledApiRequest()}
          className={`ml-3 rounded-xl  font-bold text-sm absolute top-[38%] right-4`}
          disabled={status.loading}
        >
          {status.loading && inputValue ? (
            <FaSpinner className="animate-spin" size={21} color="ff0000" />
          ) : status.succesful ? (
            <IoIosCheckmark />
          ) : (
            <IoIosSend size={21} color="ff0000" />
          )}
        </button>
      </form> */}
    </div>
  );
};
export default Comment;
