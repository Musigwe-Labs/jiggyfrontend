/* eslint-disable react/prop-types */
import { useState } from 'react'
import HomeHeader from './homeHeader'
import HomeTabs from './homeTabs'
import CreatePostBtn from './createPostBtn'
import CreatePostPage from './createPostPage'
import { Profile } from '../../private/dashboard/Profile'
import HomeFooter from './homeFooter'
import Comment from './comments'
import Posts from './posts'
import { usePosts } from '../../../contexts/postContext'

const Home = () => {
  const [createPost,setCreatePost] = useState(false)
  const [profilePage,setProfilePage] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const { posts } = usePosts()

  const handlePostClick = (post) => {
    setSelectedPost(post);
  }

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
      </div>
      <Posts posts={posts} onPostClick={handlePostClick}/>
      <CreatePostBtn setCreatePost={setCreatePost}/>
      <HomeFooter />
    </div>
  )
}

export default Home
