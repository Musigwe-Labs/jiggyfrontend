/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import { FaSpinner } from "react-icons/fa";
import axios from "../../../services/axios";
import { IoIosCheckmark, IoIosSend } from "react-icons/io";
import _ from "lodash";
import SingleComment from "./singleComment";
import Spinner from "../../common/Spinner";
import GoBackButton from "./goBackButton";
import {getComments} from '../../../utils/user'
import { useErrorContext}  from  '../../../contexts/ErrorContext'
import { useQuery, useQueryClient, QueryClient} from '@tanstack/react-query'
import { useRestoreScroll } from "../../../utils/restoreScroll";
import { queryClient } from "../../../App";



const Comment = ({ reloadPosts }) => {
  // const [userDetails, setUserDetails] = useState([]);
  const [userComment, setUserComment] = useState(null)
  const {setAppError}= useErrorContext()
  const { userDetails:{user}, key}= useAuthContext()
  const [inputValue, setInputValue] = useState("");
  const [inputHeight, setInputHeight] = useState("35px");
  const [status, setStatus] = useState({
    loading: false,
    succesful: false,
    error: "",
  });
  const { id } = useParams();
  const restoreScroll=useRestoreScroll('comments-'+id)
  const {isPending:isLoading, data, error }=useQuery({
    queryKey:['comments '+id, id, key],
    queryFn:getComments
  })
  const post= useMemo(()=> data? data.data : data , [data])
  const headers = {
    Authorization: `Token ${key}`,
  };
  const maxInputHeight = 220; // Adjust this value as needed
  
  useLayoutEffect(()=>{
    console.log(document.body.scrollHeight)
    if(userComment){
      window.scrollTo({ 
        left:0, 
        top:window.document.body.scrollHeight,
        behavior:'smooth'
      })
    }
  }, [userComment])

  useEffect(() => {
      if(error){
          setAppError(error)
      }
  }, [post, error]);

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

  function showUserCommentOffline(){
    setUserComment({content:inputValue, replies:[], user:user.generated_username, id:""})
    window.scrollTo({
      left:0, 
      top:window.document.body.scrollHeight,
      behavior:'smooth'
    })
  }

  const handleSendComment = async () => {
    setStatus({ ...status, loading: true });
    showUserCommentOffline()
    try {
      // if (inputValue) {
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
        setUserComment(null)
        setStatus({ ...status, loading: false, successful: true });
        setAppError({message:'comment sent', status:'success' })
      }
    catch (error) {
      setStatus({ ...status, error: error });
    }
  };

  const throttledApiRequest = _.throttle(handleSendComment, 2000);
  if (!post) {
    return <Spinner />;
  }
  return (
    <div className="relative h-screen h-[100svh] pts-4 px-3 flex flex-col">
      <div className="flex align-center">
        <div className="flex align-center">
          <GoBackButton />
          <h1 className="text-3xl ml-6 text-center font-bold from-[#ff0000] via-[#ff004c] to-[#0028ad] bg-gradient-to-br bg-clip-text text-transparent">
            Comment
          </h1>
        </div>
        <div></div>
      </div>
      <div className="post z-10 md:mx-10 p-3">
        <CommentInfo
          school={post.user.school}
          name={post.user.generated_username}
        />
        <Gist content={post.content} images={post.images} showFullGist={true} />
        <GistLinks post={post} />
      </div>
      <div className="mt-4 mb-10">
        <p className=" comments-length px-3 my-3 text-gray-400">
          {post.comments.length}{" "}
          {post.comments.length <=1 ? "comment" : "comments"}
        </p>
        <div className="comments mx-2 flex-1 gap-4 flex flex-col overflow-auto border-l border-gray-500">
          {post.comments.map((comment) => 
            <SingleComment key={comment.created_at} comment={comment} />
            ).reverse()
          }
          {userComment && <SingleComment key={Date.now()} comment={userComment} /> }
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
          className={`resize-none p-2 pr-14 block w-full border-b bg-transparent rounded-md  focus:outline-none ${status.loading? 'text-slate-300':''}`}
          placeholder="Comment your thought"
          rows={{ inputHeight }}
          value={inputValue}
          onChange={e => handleInputChange(e)}
          disabled={status.loading}
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


