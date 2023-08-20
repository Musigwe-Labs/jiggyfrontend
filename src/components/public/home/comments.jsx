/* eslint-disable react/prop-types */
import { useContext, useState , useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import CommentInfo from './commentInfo'
import Gist from './gist'
import GistLinks from './gistLinks'
import profile_pic from '../../../assets/profile_pics/pic1.png'
import { userInfo } from '../../../apis/authenticationApis'
import { FaArrowLeftLong } from 'react-icons/fa6'
import axios from 'axios'
import { IoIosSend } from 'react-icons/io'

const Comment =({post , setSelectedPost })=>{
    const [content , setContent] = useState()

    const { key } = useContext(AuthContext)
    const [userinfo, setUserinfo] = useState(null);

    useEffect(() => {
        userInfo(key, setUserinfo);
    }, [key])
    const headers = {
        "Authorization" : `Token ${key}`
    }

    const handleTextareaChange = (e)=>{
        setContent(e.target.value)
    }

    const handleSendComment = async()=>{
        try {
            const data = {post:post.id ,user:userinfo.pk , content }
            await axios.post('https://cruise.pythonanywhere.com/annon/comments/' , data , {headers})
            setContent('')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className='z-50 h-screen pt-4 px-3'>
            <div className='flex align-center'>
                <FaArrowLeftLong size={25} onClick={()=>setSelectedPost(null)}/>
                <h1 className='text-3xl ml-6 text-center font-bold from-[#ff0000] via-[#ff004c] to-[#0028ad] bg-gradient-to-br bg-clip-text text-transparent'>Comment</h1>
            </div>
            <div className='z-10 md:mx-10 p-3'>
              <CommentInfo school={post.user.school} name={post.user.generated_username} />
              <Gist post={post} />
              <GistLinks post={post}/>
            </div>
            <p className='px-3 my-3 text-gray-400'>{post.comments.length} comments</p>
            <div className='mx-2 max-h-[100%] overflow-auto border-l border-gray-500'>
                {
                    post.comments.map((comment) =>{
                        return (
                        <div key={comment.created_at} className='text-base bg-[#1717171a] mt-2 px-3 rounded-xl'>
                            <div className='flex items-center mb-1'>
                                <img className='w-6 rounded-3xl mr-2' src={profile_pic} alt='profile-img' />
                                <h4 className='text-white mr-1 text-base font-bold'>{comment.name}</h4>
                            </div>
                            <p className='text-base'><span className='text-[14.5px] text-blue-500 mr-2 font-light'>@{post.user.generated_username}</span>{comment.content}</p>
                        </div>
                        )
                      })
                }
            </div>
            <div className='absolute w-[100%] border-t border-gray-500 left-0 bottom-3 px-2 bg-black'>
                <input 
                type='text'
                placeholder='Comment your thought'
                className='h-[50%] w-[85%] border-b border-gray-600 bg-transparent text-white p-2'
                value={content}
                onChange={handleTextareaChange}/>
                <button className='bg-[#5357B6] ml-2 py-1 px-2 fixed bottom-[10px] rounded-xl font-bold text-sm' onClick={handleSendComment}><IoIosSend size={21}/></button>
            </div>
        </div>
    )
}

export default Comment