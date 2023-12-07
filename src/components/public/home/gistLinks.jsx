/* eslint-disable react/prop-types */
import {Link} from "react-router-dom"
import { useContext, useState } from "react";
import "./home.css";

import { FaRegComments } from "react-icons/fa";
import { AiOutlineEye, AiOutlineShareAlt } from "react-icons/ai";
import { IoMdFlame } from "react-icons/io";
import ChatCircle from "../../../assets/chatCircle.svg"
import Connect from "../../../assets/Connect.svg"
import FireSimple from "../../../assets/fireSimple.svg"
import Eye from "../../../assets/Eye.svg"

import axios from "../../../services/axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { PostSharing } from "../../../App";

// import axios from 'axios'

const GistLinks = ({ post, onPostClick }) => {
  let { likes, comments, views, shared } = post;
  const { setSharePost, setSelectedPostId } = useContext(PostSharing);

  const [isLiked, setIsLiked] = useState(false); //currently using a state but we will have to get this info from the backend
  // const [isSeen , setIsSeen] = useState(false)  //currently using a state but we will have to get this info from the backend
  // const [likes, setLikes] = useState()
  const { key, userDetails } = useContext(AuthContext);
  const handleLiked = async (event) => {
    setIsLiked(!isLiked)
    console.log(event.target.children)
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
    <div className="flex justify-between mt-4 text-white">
    
      <Link
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => {
          setSelectedPostId(post.id)
        }}
        to={`/comment/${post.id}`}
      >
        <img src={ChatCircle} width={15} height={15} alt="comments" />
        <p className="text-xs font-semibold self-end">{comments.length}</p>
      </Link>
      <div
        className="flex items-center gap-1 cursor-pointer"
      >
        {/* <IoMdFlame
          className={`${isLiked && "liked"} text-2xl cursor-pointer`}
          onClick={handleLiked}
        /> */}
          <div>
            <svg width="15" height="20" viewBox="0 0 15 15" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${isLiked && "liked"} cursor-pointer`} 
                onClick={handleLiked}
            >
                <path d="M8.40117 1.0459C8.34339 0.997853 8.2749 0.964407 8.20148 0.948378C8.12806 0.93235 8.05186 0.934208 7.97931 0.953796C7.90676 0.973384 7.83999 1.01013 7.78461 1.06093C7.72924 1.11173 7.68689 1.1751 7.66113 1.2457L6.37207 4.78535L4.95645 3.41367C4.9089 3.36756 4.85213 3.33205 4.78987 3.30947C4.7276 3.2869 4.66126 3.27777 4.59522 3.2827C4.52917 3.28763 4.46492 3.30649 4.40669 3.33806C4.34847 3.36962 4.2976 3.41316 4.25742 3.46582C2.98828 5.12871 2.34375 6.80156 2.34375 8.4375C2.34375 9.80502 2.887 11.1165 3.85398 12.0835C4.82097 13.0505 6.13248 13.5937 7.5 13.5937C8.86752 13.5937 10.179 13.0505 11.146 12.0835C12.113 11.1165 12.6562 9.80502 12.6562 8.4375C12.6562 4.9541 9.68027 2.10937 8.40117 1.0459ZM7.5 12.6562C6.3815 12.655 5.30916 12.2101 4.51826 11.4192C3.72736 10.6283 3.28249 9.556 3.28125 8.4375C3.28125 7.14843 3.75527 5.81308 4.69102 4.4625L6.23613 5.96132C6.29225 6.01582 6.36111 6.05541 6.43644 6.07648C6.51177 6.09755 6.59117 6.09943 6.66742 6.08196C6.74366 6.06449 6.81432 6.02821 6.87296 5.97644C6.9316 5.92466 6.97634 5.85904 7.00312 5.78554L8.30801 2.20722C9.62168 3.40312 11.7188 5.73691 11.7188 8.4375C11.7175 9.556 11.2726 10.6283 10.4817 11.4192C9.69084 12.2101 8.6185 12.655 7.5 12.6562Z" fill={isLiked?"#f33f5e":"white"}/>
              </svg>

          </div>
         <p className="text-xs font-semibold self-end ">{likes.length + isLiked && 1}</p>
         </div>
      <div className="flex items-center gap-1 cursor-pointer">
          <img className="cursor-pointer" src={Eye} height={20} alt="views" />
          <p className="text-xs font-semibold">{views}</p>
      </div>
      <img  className="cursor-pointer"
        onClick={() => handlePostSharing(post)}
        src={Connect} width={15} height={15} alt="share"
      />

    </div>
  );
};

export default GistLinks;
