import { useEffect, useState } from 'react'
import HomeHeader from './homeHeader'
import HomeTabs from './homeTabs'
import axios from 'axios'
import CreatePostBtn from './createPostBtn'
import CreatePostPage from './createPostPage'
import { Profile } from '../../private/dashboard/Profile'
import HomeFooter from './homeFooter'
import Comment from './comments'
import Posts from './posts'

const Home = () => {
  const [createPost,setCreatePost] = useState(false)
  // const [comment,setComment] = useState(false)
  const [profilePage,setProfilePage] = useState(false)
  const [posts, setPost] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  const handlePostClick = (post) => {
    setSelectedPost(post);
  }
  
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

  // if(comment){
  //   return(
  //     <Comment setComment={setComment}/>
  //   )
  // }
  
  if(selectedPost !== null){
    return(
      <Comment post={selectedPost}/>
    )
  }

  return (
    <div>
    {profilePage ? <Profile setProfilePage={setProfilePage}/> :''}
      <div className='sticky top-0 bg-black'> 
        <HomeHeader setProfilePage={setProfilePage}/>
        <HomeTabs />
      </div>
      <Posts posts={posts} onPostClick={handlePostClick}/>
      <CreatePostBtn setCreatePost={setCreatePost}/>
      <HomeFooter />
    </div>
  )
}

export default Home;
