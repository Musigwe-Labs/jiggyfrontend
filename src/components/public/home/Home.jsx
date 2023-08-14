import { useEffect, useState } from 'react'
import Gist from './gist'
import GistLinks from './gistLinks'
import HomeHeader from './homeHeader'
import HomeInfo from './homeInfo'
import HomeTabs from './homeTabs'
import HomeFooter from './homeFooter'
import axios from 'axios'

const Home = () => {
  const[posts, setPost] = useState([])
  const getPost = async()=>{
    try {
      const response = await axios.get('https://cruise.pythonanywhere.com/annon/posts/')
      setPost(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
  getPost()
  },[])
  return (
    <div>
      <HomeHeader />
      <HomeTabs />
      {
        posts.map(
          (post)=>{
            return(
              <div key={post.id} className='text-base mt-2'>
                <div className='mx-4 md:mx-16 p-3 border-b border-y-[#4B5563]'>
                  <HomeInfo post={post}/>
                  <span className={`text-base text-[7.5px] border px-2 rounded-full ml-8 ${post.post_type}`}>{post.post_type}</span>
                  <Gist post={post}/>
                  <GistLinks post={post}/>
                </div>
              </div>
            )
          }
        )
      }
      <HomeFooter className='fixed bottom-0'/>
    </div>
  )
}

export default Home