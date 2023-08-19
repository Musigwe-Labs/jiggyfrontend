/* eslint-disable react/prop-types */
import { FaRegComments } from "react-icons/fa";
import { AiOutlineEye , AiOutlineShareAlt } from "react-icons/ai";
import { IoMdFlame } from "react-icons/io";
import { useState } from "react";
import './home.css'

const GistLinks = ({ post , setComment}) => {
   
    const [isLiked , setIsLiked] = useState(false)  //currently using a state but we will have to get this info from the backend
    // const [isSeen , setIsSeen] = useState(false)  //currently using a state but we will have to get this info from the backend
    return (
    <div className='flex justify-between px-5 mt-4 text-white'>
        <div className='flex items-center cursor-pointer' onClick={()=>{setComment(true)}}>
            <FaRegComments className='cursor-pointer text-2xl'/>
            <p className='ml-3'>{post.comments.length}</p>
        </div>
        <div className='flex items-center cursor-pointer' onClick={()=>{
                setIsLiked(!isLiked)
            }}>
            <IoMdFlame className={`${isLiked?'liked':'text-2xl'} cursor-pointer`} />
            <p className='ml-3'>{post.likes.length}</p>
        </div>
        <div className='flex items-center cursor-pointer'>
            <AiOutlineEye className='cursor-pointer text-2xl'/>
            <p className='ml-3'>{post.views}</p>
        </div>
        <AiOutlineShareAlt  className='cursor-pointer text-2xl'/>
    </div>
)
  }
  
  export default GistLinks