import { LiaTimesSolid , LiaCheckSolid } from 'react-icons/lia'
import axios from 'axios'
import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const CreatePostPage = ({setCreatePost})=>{
    const[inputValue , setInputValue] = useState('')
    const[content , setContent] = useState()

    const { key } = useContext(AuthContext)
    console.log("key is ",key)
    const headers = {
        "Authorization" : `Token ${key}`
    }

    const handleInputChange = (e)=>{
        setInputValue(e.target.value)
    }

    const handleTextareaChange = (e)=>{
        setContent(e.target.value)
    }
    const handlePost= async()=>{
        try {
            const data = {content , post_type:'Confession'}
            console.log(data)
            await axios.post("https://cruise.pythonanywhere.com/annon/posts/create/" , data , {headers})
            setCreatePost(false)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className='fixed top-0 z-50 h-full w-full bg-[#d36666]'>
            <div className='flex justify-between px-5 pt-12 pb-2 border-b align-center'>
                <LiaTimesSolid size='25' color='black' onClick={()=>{setCreatePost(false)}}/>
                <p className='font-bold'>Create an anonymous post</p>
                <LiaCheckSolid size='25'color='black' onClick={handlePost}/>
            </div>
            <input 
            type='text'
            value={inputValue}
            onChange={handleInputChange} 
            placeholder='Choose a nick name(optional)' 
            className='w-full bg-transparent p-2 border-b'/>

            <textarea
            value={content}
            onChange={handleTextareaChange} 
            placeholder="Secret crush ? Confession ? Share ? what's on your mind...."  
            className='w-full bg-transparent p-4'></textarea>
        </div>
    )
}

export default CreatePostPage