/* eslint-disable react/prop-types */
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeHeader from './homeHeader'
import HomeTabs from './homeTabs'
import CreatePostBtn from './createPostBtn'
import CreatePostPage from './createPostPage'
import { Profile } from '../../private/dashboard/Profile'
import HomeFooter from './homeFooter'
import Comment from './comments'
import Posts from './posts'
import axios from 'axios'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { GiDualityMask } from 'react-icons/gi'
import { BsCheckCircleFill } from 'react-icons/bs'

const Home = () => {
  const [createPost,setCreatePost] = useState(false)
  const [profilePage,setProfilePage] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isAll , setIsAll] = useState(false)
  const [posts , setPosts] = useState([])

  const navigate = useNavigate()
  const handlePostClick = (post) => {
    setSelectedPost(post);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://cruise.pythonanywhere.com/annon/posts/');
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [])
  // }, [posts])

  if(createPost){
    return(
      <CreatePostPage setCreatePost={setCreatePost}/>
    )
  }

  if(selectedPost !== null){
    return(
    <div className='overflow-hidden'>
      <Comment post={selectedPost} setSelectedPost={setSelectedPost}/>
    </div>
    )
  }
  return (
    <div>
    {profilePage ? <Profile setProfilePage={setProfilePage}/> :''}
      <div className='sticky top-0 bg-black'> 
        <HomeHeader setProfilePage={setProfilePage}/>
        <HomeTabs />
        <div className='mt-1 ml-4 flex'>
          <span className='flex items-center border-b-2 px-1 border-y-[#00CCCC]' onClick={()=>setIsAll(!isAll)}>
            <p className='text-[#00CCCC] font-bold mr-1'>All</p>
            {isAll ? <FaAngleUp color='gray' size={17} /> : <FaAngleDown color='gray' size={17} />}
          </span>
          <div className={isAll ? 'p-2 border border-[#490A0A] w-32' : 'hidden'}>
            <span className='flex justify-between cursor-pointer items-center mb-2'>
              <GiDualityMask size={20}/>
              <p>FUTO</p>
              <BsCheckCircleFill />
            </span>
            <span className='flex justify-between cursor-pointer items-center' onClick={()=>navigate('/dashboard')}>
              <FiPhone size={20}/>
              <p>Jiggy</p>
              <BsCheckCircleFill />
            </span>
          </div>
        </div>
      </div>
      <Posts posts={posts} onPostClick={handlePostClick}/>
      <CreatePostBtn setCreatePost={setCreatePost}/>
      <HomeFooter />
    </div>
  )
}

export default Home
