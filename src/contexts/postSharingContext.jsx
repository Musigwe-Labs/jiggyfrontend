import {useState, createContext, useContext} from 'react'
const PostSharingContext=createContext()
function PostSharingContextProvider ( {children} ){
    const [sharePost, setSharePost] = useState({ post: {}, view: false })
    return <PostSharingContext.Provider value={{sharePost, setSharePost, }} >
     		{children}
     </PostSharingContext.Provider>
}
function  usePostSharingContext(){
  const context= useContext(PostSharingContext)
  if(!context){
    return
  }
  return context
}
export  {PostSharingContextProvider, usePostSharingContext }