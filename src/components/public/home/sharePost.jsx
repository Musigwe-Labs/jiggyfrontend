import React from "react";
import { LiaUserCircleSolid } from "react-icons/lia";
import HomeInfo from "./homeInfo";
import Gist from "./gist";
import Socialmedialinks from "./socialmedialinks";
import { usePostSharingContext } from "../../../contexts/postSharingContext";

function SharePost() {

  const { sharePost, setSharePost }= usePostSharingContext()
  let { content, user, created_at, id } =
    (sharePost.post && sharePost.post) || {};
  console.log(id);

  if(sharePost.view){
    return (  
      <div className="fixed z-10 grid place-items-center top-0 left-0 w-screen h-screen">
      <div
        onClick={() => setSharePost({ post: {}, view: false })}
        className="absolute top-0 left-0 w-screen bg-[rgba(0,0,0,.5)] h-screen"
      ></div>
      <div className="relative rounded-xl overflow-hidden w-[min(85%,_35rem)] bg-black shadow-[0_0_5px_0]">
        <header
          className="px-4 py-5"
          style={{
            background:
              "linear-gradient(96.3deg, #F33F5E 8.49%, rgba(255, 0, 138, 0.62) 55.19%, rgba(180, 22, 254, 0.4) 98.14%)",
          }}
        >
          <h5 className="w-4/5 text-center mx-auto">
            Send an anonymous message on JIGGY
          </h5>
        </header>
        <main className=" px-5 py-5">
          <HomeInfo
            school={user.school}
            name={user.generated_username}
            created_at={created_at}
          />
          <Gist content={content} showFullGist={true} />
          <Socialmedialinks postId={id} content={content} />
        </main>
      </div>
    </div>
  ) ;
  }else{
    return <div></div>
  }
 
}

export default SharePost;
