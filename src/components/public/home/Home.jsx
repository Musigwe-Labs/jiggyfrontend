import { useEffect, useState } from 'react'
import Gist from './gist'
import GistLinks from './gistLinks'
import HomeHeader from './homeHeader'
import HomeInfo from './homeInfo'
import HomeTabs from './homeTabs'
import axios from 'axios'
import CreatePostBtn from './createPostBtn'
import CreatePostPage from './createPostPage'
import { Profile } from '../../private/dashboard/Profile'
import HomeFooter from './homeFooter'

const Home = () => {
  const [createPost,setCreatePost] = useState(false)
  const [profilePage,setProfilePage] = useState(false)
  const [posts, setPost] = useState([])

  
  const getPost = async () => {
    try {
      const response = await axios.get( 'https://cruise.pythonanywhere.com/annon/posts/' )
      setPost(response.data)
    } catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getPost();
  }, [createPost])

  if(createPost){
    return(
      <CreatePostPage setCreatePost={setCreatePost}/>
    )
  }
  return (
    <div>
    {profilePage ? <Profile setProfilePage={setProfilePage}/> :''}
      <div className='sticky top-0 bg-black'> 
        <HomeHeader setProfilePage={setProfilePage}/>
        <HomeTabs />
      </div>
      <div className='pb-[29px]'>
        {posts.map((post) => {
          return (
            <div key={post.id} className='text-base mt-2'>
              <div className='mx-4 md:mx-16 p-3 border-b border-y-[#4B5563]'>
                <HomeInfo school={post.user.school} name={post.user.generated_username}/>
                <span className={`text-base text-[7.5px] border px-2 rounded-full ml-8 ${post.post_type}`} >
                  {post.post_type}
                </span>
                <Gist post={post} />
                <GistLinks post={post} />
              </div>
            </div>
          )
        })}
      </div>
      <CreatePostBtn setCreatePost={setCreatePost}/>
      <HomeFooter />
    </div>
  )
}

export default Home;
