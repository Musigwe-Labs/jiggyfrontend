import { FaRegComments } from "react-icons/fa";
import { AiOutlineEye , AiOutlineShareAlt } from "react-icons/ai";
import { VscFlame } from "react-icons/vsc";
import { useState } from "react";

const GistLinks = () => {
    const [isLiked , setIsLiked] = useState(false)  //currently using a state but we will have to get this info from the backend
    // const [isSeen , setIsSeen] = useState(false)  //currently using a state but we will have to get this info from the backend
    return (
    <div className='flex justify-between px-28 mt-4'>
        <div className='flex items-center cursor-pointer'>
            <FaRegComments />
            <p className='ml-3'>22.5k</p>
        </div>
        <div className='flex items-center cursor-pointer'>
            <VscFlame onClick={()=>{
                setIsLiked(!isLiked)
            }} className={isLiked ? 'liked':''}/>
            <p className='ml-3'>10.9k</p>
        </div>
        <div className='flex items-center cursor-pointer'>
            <AiOutlineEye />
            <p className='ml-3'>10.9k</p>
        </div>
        <AiOutlineShareAlt  className='cursor-pointer'/>
    </div>
)
  }
  
  export default GistLinks

  80120616475