/* eslint-disable react/prop-types */
import Gist from "./gist"
import GistLinks from "./gistLinks"
import HomeInfo from "./homeInfo"

const Posts=({posts , onPostClick})=>{
    return(
        <div className='pb-[29px]'>
        {posts.map((post) => {
          return (
            <div key={post.id} className='text-base mt-2'>
              <div className='mx-4 md:mx-16 p-3 border-b border-y-[#4B5563]'>
                <HomeInfo school={post.user.school} name={post.user.generated_username}/>
                <span className={`text-base text-[7.5px] border px-2 rounded-full ml-8 ${post.post_type}`} >
                  {post.post_type}
                </span>
                <div onClick={()=>onPostClick(post)}>
                  <Gist post={post} />
                </div>
                <GistLinks post={post}/>
              </div>
            </div>
          )
        })}
      </div>
    )
}

export default Posts