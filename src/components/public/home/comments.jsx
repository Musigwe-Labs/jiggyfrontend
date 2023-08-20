/* eslint-disable react/prop-types */
import { useContext, useState , useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import CommentInfo from './commentInfo'
import Gist from './gist'
import profile_pic from '../../../assets/profile_pics/pic1.png'
import { userInfo } from '../../../apis/authenticationApis'
import { FaArrowLeftLong } from 'react-icons/fa6'
import axios from 'axios'

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
        <div className='z-50 h-screen bg-[#321616] pt-6 px-3'>
            <FaArrowLeftLong size={25} onClick={()=>setSelectedPost(null)}/>
            <div className='z-10 mx-2 md:mx-16 bg-[#110101] p-3 rounded-3xl'>
              <CommentInfo school={post.user.school} name={post.user.generated_username} />
              <span className='text-sm text-gray-400 ml-8'>{'17h'}</span>
              <Gist post={post} />
            </div>
                <p className='px-3 my-3 text-gray-400'>{post.comments.length} comments</p>
            <div className='mx-2 max-h-[100%] overflow-auto'>
                {
                    post.comments.map((comment) =>{
                        return (
                        <div key={comment.created_at} className='text-base mt-2 bg-[#110101] p-3 rounded-3xl'>
                            <div className='flex items-center'>
                                <img className='w-6 rounded-3xl mr-2' src={profile_pic} alt='profile-img' />
                                <h4 className='text-white mr-1 text-base font-bold'>{comment.name}</h4>
                            </div>
                            <p>{comment.content}</p>
                        </div>
                        )
                      })
                }
            </div>
            <div className='absolute w-[92%] grid place-items-end bottom-0 p-1 bg-[#321616]'>
                <input 
                type='text' 
                className='h-[50%] mb-[10px] w-full rounded border-cyan-600 text-black p-2'
                value={content}
                onChange={handleTextareaChange}/>
                <button className='float-right bg-[#5357B6] py-1 px-2 rounded-xl font-bold text-sm' onClick={handleSendComment}>SEND</button>
            </div>
        </div>
    )
}

export default Comment