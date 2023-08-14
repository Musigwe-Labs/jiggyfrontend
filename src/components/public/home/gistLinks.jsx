import { FaRegComments } from "react-icons/fa";
import { AiOutlineEye , AiOutlineShareAlt } from "react-icons/ai";
import { VscFlame } from "react-icons/vsc";
import { useState } from "react";
import './home.css'

const GistLinks = ({ post }) => {
    const {likes,comments,views} = post
    const [isLiked , setIsLiked] = useState(false)  //currently using a state but we will have to get this info from the backend
    // const [isSeen , setIsSeen] = useState(false)  //currently using a state but we will have to get this info from the backend
    return (
    <div className='flex justify-between px-5 mt-4 text-white'>
        <div className='flex items-center cursor-pointer'>
            <FaRegComments />
            <p className='ml-3'>{comments.length}</p>
        </div>
        <div className='flex items-center cursor-pointer' onClick={()=>{
                setIsLiked(!isLiked)
            }}>
            <VscFlame className={isLiked?'liked':''} />
            <p className='ml-3'>{likes.length}</p>
        </div>
        <div className='flex items-center cursor-pointer'>
            <AiOutlineEye />
            <p className='ml-3'>{views}</p>
        </div>
        <AiOutlineShareAlt  className='cursor-pointer'/>
    </div>
)
  }
  
  export default GistLinks