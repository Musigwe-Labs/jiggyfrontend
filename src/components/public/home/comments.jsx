/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
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
import { Link, useParams } from "react-router-dom";
import Spinner from "../../common/Spinner";
import {getComments} from '../../../utils/user'
import { useErrorContext}  from  '../../../contexts/ErrorContext'
import { useQuery, useQueryClient, QueryClient} from '@tanstack/react-query'
import { useRestoreScroll } from "../../../utils/restoreScroll";
import { queryClient } from "../../../App";



const Comment = ({ reloadPosts }) => {
  const {setAppError}= useErrorContext()
  const [inputValue, setInputValue] = useState("");
  const [inputHeight, setInputHeight] = useState("35px");
  const [userDetails, setUserDetails] = useState([]);
  // const [post, setPost] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    succesful: false,
    error: "",
  });
  const { id } = useParams();
  const { key } = useAuthContext();
  const restoreScroll=useRestoreScroll('comments-'+id)

  const {isPending:isLoading, data, error }=useQuery({
    queryKey:['commments '+id, id, key],
    queryFn:getComments
  })

const post= useMemo(()=> data? data.data : data , [data])

  const headers = {
    Authorization: `Token ${key}`,
  };
  // useEffect(() => {
  //   const fetchUser = async () => {,
  //     try {
  //       if (localStorage.getItem("login") !== null) {
  //         const user_response = await axios.get("account/annonyuser/", {
  //           headers,
  //         });
  //         setUserDetails(user_response.data)
  //       }
  //     } catch (error) {}
  //   };
  //   fetchUser();
  // }, []);
  
  useEffect(() => {
    // const fetchPosts = async () => {
    //   try {
    //     const response = await axios.get(`/annon/posts/detail/${id}/`, {
    //       headers,
    //     });
    //     setPost(response.data);

    //   } catch (err) {
    //     // setError(err.message);
    //   }
    // };
    // fetchPosts();
      if(error){
          setAppError(error)
      }
  }, [post, error]);
  const maxInputHeight = 220; // Adjust this value as needed

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
      // if (inputValue) {
        setStatus({ ...status, loading: true });
        const data = { content: inputValue, post: post.id };
        await axios.post("annon/posts/comment/", data, { headers });
        console.log(inputValue);
        setInputValue("");
        // await reloadPosts();
        await queryClient.refetchQueries({
          queryKey: ['commments '+id, id, key],
          exact: true,
          type: "active",
        });
        setStatus({ ...status, loading: false, successful: true });
        setAppError({message:'comment sent'})
      // }
    } catch (error) {
      setStatus({ ...status, error: error });
    }
  };

  const throttledApiRequest = _.throttle(handleSendComment, 2000);
  if (!post) {
    return <Spinner />;
  }
  return (
    <div className="relative min-h-screen pt-4 px-3 flex flex-col">
      <div className="flex align-center">
        <div className="flex align-center">
          <Link to="/home">
            <FaArrowLeftLong size={25} className="cursor-pointer" />
          </Link>
          <h1 className="text-3xl ml-6 text-center font-bold from-[#ff0000] via-[#ff004c] to-[#0028ad] bg-gradient-to-br bg-clip-text text-transparent">
            Comment
          </h1>
        </div>
        <div></div>
      </div>
      <div className="z-10 md:mx-10 p-3">
        <CommentInfo
          school={post.user.school}
          name={post.user.generated_username}
        />
        <Gist content={post.content} images={post.images} showFullGist={true} />
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
          onChange={e => handleInputChange(e)}
        />
        <button
          type="submit"
          onClick={() => throttledApiRequest()}
          className={`ml-3 rounded-xl disabled:opacity-50 transition-opacity duration-200 ease-linear font-bold text-sm absolute top-[38%] right-4`}
          disabled={status.loading || !inputValue}
        >
          {status.loading && inputValue ? (
            <FaSpinner className="animate-spin" size={21} color="ff0000" />
          ) : status.succesful ? (
            <IoIosCheckmark />
          ) : (
            <IoIosSend size={21} color="ff0000" />
          )}
        </button>
      </form>
    </div>
  );
};
export default Comment;
