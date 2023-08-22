/* eslint-disable react/prop-types */
import { LiaTimesSolid , LiaCheckSolid } from 'react-icons/lia'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

const CreatePostPage = ({setCreatePost })=>{
    const [content , setContent] = useState()
    const [post_type , setSelectedOption] = useState('Others')

    const { key } = useContext(AuthContext)
    const headers = {
        "Authorization" : `Token ${key}`
    }

    const handleTextareaChange = (e)=>{
        setContent(e.target.value)
    }

    const handleBtnClick = (option)=>{
        setSelectedOption(option)
    }
    const handlePost= async()=>{
        try {
            const data = { content , post_type }
            await axios.post("https://cruise.pythonanywhere.com/annon/posts/create/" , data , {headers})
            // window.location.reload()
            setCreatePost(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className='fixed top-0 z-50 h-screen w-full bg-[#321616]'>
            <div className='flex justify-between px-5 pt-12 pb-2 border-b align-center'>
                <LiaTimesSolid size='25' color='white' cursor='pointer' onClick={()=>{setCreatePost(false)}}/>
                <p className='font-bold'>Create an anonymous post</p>
                <LiaCheckSolid size='25'color='white' cursor='pointer' onClick={handlePost}/>
            </div>
            <button className={`${post_type} rounded-full px-2 mx-3 mt-3 mb-1`}>{post_type}</button>

            <textarea
            value={content}
            onChange={handleTextareaChange} 
            placeholder="Secret crush ? Confession ? Share ? what's on your mind...."  
            className='focus:outline-none post-placeholder'></textarea>

            <div className='px-3'>
                <button className='Confession rounded-full px-2 m-2' onClick={()=>handleBtnClick('Confession')}>Confession</button>
                <button className='Question rounded-full px-2 m-2' onClick={()=>handleBtnClick('Question')}>Question</button>
                <button className='Crush rounded-full px-2 m-2' onClick={()=>handleBtnClick('Crush')}>Crush</button>
                <button className='DM rounded-full px-2 m-2' onClick={()=>handleBtnClick('DM')}>DM</button>
                <button className='Advice rounded-full px-2 m-2' onClick={()=>handleBtnClick('Advice')}>Advice</button>
                <button className='Cruise rounded-full px-2 m-2' onClick={()=>handleBtnClick('Cruise')}>Cruise</button>
                <button className='Talk rounded-full px-2 m-2' onClick={()=>handleBtnClick('Talk')}>Talk</button>
                <button className='Others rounded-full px-2 m-2' onClick={()=>handleBtnClick('Others')}>Others</button>
            </div>
        </div>
    )
}

export default CreatePostPage