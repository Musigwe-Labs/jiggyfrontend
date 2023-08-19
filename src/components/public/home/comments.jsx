/* eslint-disable react/prop-types */
import { useState } from 'react'
import CommentInfo from './commentInfo'
import Gist from './gist'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Comment =({post})=>{
    const [content , setContent] = useState()

    const handleTextareaChange = (e)=>{
        setContent(e.target.value)
    }

    const handleSendComment = ()=>{

    }
    console.log(post)
    return(
        <div className='fixed top-0 z-50 h-screen w-full grid bg-[#321616] pt-6 px-3'>
            <FaArrowLeftLong size={25}/>
            <div className='mx-2 md:mx-16 bg-[#110101] p-3 rounded-3xl place-self-start'>
              <CommentInfo school={post.user.school} name={post.user.generated_username} />
              <span className='text-sm text-gray-400 ml-8'>{'17h'}</span>
                <Gist post={post} />
            </div>
            <div>
sdovn
            </div>
            <div className='w-[92%] p-1 h-[50px] place-self-end rounded-xl bg-white'>
                <input 
                type='text' 
                className='h-[50%] mb-[16px] w-full rounded border-cyan-600 text-black p-2'
                value={content}
                onChange={handleTextareaChange}/>
                <button className='bottom-0 bg-[#5357B6] h-[48px] px-6 rounded-3xl font-bold text-xl' onClick={handleSendComment}>SEND</button>
            </div>
        </div>
    )
}

export default Comment