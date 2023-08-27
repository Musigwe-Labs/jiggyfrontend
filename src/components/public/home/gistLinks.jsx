/* eslint-disable react/prop-types */
import { FaRegComments } from 'react-icons/fa'
import { AiOutlineEye , AiOutlineShareAlt } from 'react-icons/ai'
import { IoMdFlame } from 'react-icons/io'
import { useState } from 'react'
import './home.css'
import axios from "../../../services/axios";

// import axios from 'axios'

const GistLinks = ({ post , setComment}) => {
    let {likes, comments, views, shared} = post;
   
    const [isLiked , setIsLiked] = useState(false)  //currently using a state but we will have to get this info from the backend
    // const [isSeen , setIsSeen] = useState(false)  //currently using a state but we will have to get this info from the backend
    // const [likes, setLikes] = useState()
    const handleLiked = async()=>{
        try {
            await axios.post(`/annon/posts/${post.id}/increase-likes/`)
        } catch (error) {
            console.error('Error sending like',error)
        }
    }

    return (
    <div className='flex justify-between px-5 mt-4 text-white'>
        <div className='flex items-center cursor-pointer' onClick={()=>{setComment(true)}}>
            <FaRegComments className='cursor-pointer text-2xl'/>
            <p className='ml-3'>{comments.length}</p>
        </div>
        <div className='flex items-center cursor-pointer' onClick={()=>{
                setIsLiked(!isLiked)
            }}>
            <IoMdFlame className={`${isLiked && 'liked'} text-2xl cursor-pointer`} onClick={handleLiked}/>
            <p className='ml-3'>{likes.length + isLiked && 1}</p>
        </div>
        <div className='flex items-center cursor-pointer'>
            <AiOutlineEye className='cursor-pointer text-2xl'/>
            <p className='ml-3'>{views}</p>
        </div>
        <AiOutlineShareAlt  className='cursor-pointer text-2xl'/>
    </div>
)
  }
  
  export default GistLinks