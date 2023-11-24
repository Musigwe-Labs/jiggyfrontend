/* eslint-disable react/prop-types */
import { FaRegComments } from "react-icons/fa";
import { AiOutlineEye, AiOutlineShareAlt } from "react-icons/ai";
import { IoMdFlame } from "react-icons/io";
import {Link} from "react-router-dom"
import { useContext, useState } from "react";
import "./home.css";
import axios from "../../../services/axios";
import { PostSharing } from "./Home";
import { AuthContext } from "../../../contexts/AuthContext";

// import axios from 'axios'

const GistLinks = ({ post, onPostClick }) => {
  let { likes, comments, views, shared } = post;
  const { setSharePost, setSelectedPostId } = useContext(PostSharing);

  const [isLiked, setIsLiked] = useState(false); //currently using a state but we will have to get this info from the backend
  // const [isSeen , setIsSeen] = useState(false)  //currently using a state but we will have to get this info from the backend
  // const [likes, setLikes] = useState()
  const { key, userDetails } = useContext(AuthContext);
  const handleLiked = async () => {
    try {
      const headers = {
        Authorization: `Token ${key}`,
      };
      console.log(post.id);
      await axios.post(`/annon/posts/${post.id}/increase-likes/`, userDetails.id, {headers});
    } catch (error) {
      console.error("Error sending like", error);
    }
  };
  let handlePostSharing = (post) => {
    setSharePost({ post: post, view: true });
  };
  return (
    <div className="flex justify-between px-5 mt-4 text-white">
      <Link
        className="flex items-center cursor-pointer"
        onClick={() => {
          setSelectedPostId(post.id)
        }}
        to={`/comment/${post.id}`}
      >
        <FaRegComments className="cursor-pointer text-2xl" />
        <p className="ml-3">{comments.length}</p>
      </Link>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          setIsLiked(!isLiked);
        }}
      >
        <IoMdFlame
          className={`${isLiked && "liked"} text-2xl cursor-pointer`}
          onClick={handleLiked}
        />
        <p className="ml-3">{likes.length + isLiked && 1}</p>
      </div>
      <div className="flex items-center cursor-pointer">
        <AiOutlineEye className="cursor-pointer text-2xl" />
        <p className="ml-3">{views}</p>
      </div>
      <AiOutlineShareAlt
        className="cursor-pointer text-2xl"
        onClick={() => handlePostSharing(post)}
      />
    </div>
  );
};

export default GistLinks;
