  /* eslint-disable react/prop-types */
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeHeader from './homeHeader'
import HomeTabs from './homeTabs'
import CreatePostBtn from './createPostBtn'
import CreatePostPage from './createPostPage'
import { Profile } from '../../private/dashboard/Profile'
import HomeFooter from './homeFooter'
import Trending from './trending/Trending'
import Comment from './comments'
import Posts from './posts'
import axios from '../../../services/axios'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { GiDualityMask } from 'react-icons/gi'
import { BsCheckCircleFill } from 'react-icons/bs'
import { useWebSocket } from '../../../contexts/webSocketContext'

const Home = () => {
  const [createPost, setCreatePost] = useState(false)
  const [profilePage, setProfilePage] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [isAll, setIsAll] = useState(false)
  const [posts, setPosts] = useState([])
  const [selectedTab, setSelectedTab] = useState("all")
  const {isRecievedData, setIsRecievedData} = useWebSocket()
  
  const navigate = useNavigate()
  
  const handlePostClick = (post) => {
    setSelectedPost(post)
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("annon/posts/")
        setPosts(response.data)
        setIsRecievedData(false)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    fetchPosts()
  }, [isRecievedData])

  if(createPost){
    return(
      <CreatePostPage setCreatePost={setCreatePost}/>
    )
  }

  if (selectedPost !== null) {
    return (
      <div className="overflow-hidden">
        <Comment post={selectedPost} setSelectedPost={setSelectedPost} />
      </div>
    )
  }
  return (
    <>
    <div className="grow">
      {profilePage ? <Profile setProfilePage={setProfilePage} /> : ""}
      <div className="sticky top-0 bg-black">
        <HomeHeader setProfilePage={setProfilePage} />
        <HomeTabs setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <div className="my-2 ml-4 flex relative">
          <span className="flex items-center border-b-2 px-1 border-y-[#00CCCC]" onClick={() => setIsAll(!isAll)} >
            <p className="text-[#00CCCC] font-bold mr-1">All</p>
            {isAll ? (
              <FaAngleUp color="gray" size={17} />
            ) : (
              <FaAngleDown color="gray" size={17} />
            )}
          </span>
          <div
            className={`border h-0 rounded-3xl rounded-tl-none absolute top-full transition-[all_.3s_ease] bg-[linear-gradient(0deg,_#000000d3,_#000000d3),linear-gradient(0deg,_#490A0Ad3,_#490A0Ad3)] border-[#490A0A] w-32 overflow-hidden ${
              !isAll ? "h-0" : "h-24"
            }`}
          >
            <div className="flex justify-between p-2 cursor-pointer items-center mb-2">
              <GiDualityMask size={20} fill="#752626" />
              <p
                className="opacity-70"
                style={{ textShadow: "0 0 2px #490A0A" }}
              >
                FUTO
              </p>
              <BsCheckCircleFill
                fill="#BA3131"
                className="border-[1px] border-solid border-[#490A0A] rounded-full"
              />
            </div>
            <div
              className="flex justify-between p-2 cursor-pointer items-center"
              onClick={() => navigate("/dashboard")}
            >
              <FiPhone size={20} color="#752626" />
              <p
                className="opacity-70"
                style={{ textShadow: "0 0 2px #490A0A" }}
              >
                Jiggy
              </p>
              <BsCheckCircleFill
                fill="#8D6666"
                className="border-[1px] border-solid border-[#490A0A] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTab === "all" ? (
        <Posts posts={posts} onPostClick={handlePostClick} />
      ) : (
        // <div>Trending</div>
        <Trending posts={posts} />
      )}

      <CreatePostBtn setCreatePost={setCreatePost} />
    </div>
      <HomeFooter />
      </>
  )
}

export default Home
