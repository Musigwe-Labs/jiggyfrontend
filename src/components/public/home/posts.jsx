/* eslint-disable react/prop-types */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Gist from "./gist";
import GistLinks from "./gistLinks";
import HomeInfo from "./homeInfo";
import { PostType } from "./postType";
import Spinner from "../../common/Spinner";
import { HiRefresh } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa6";
import ErrorOccurred from "../../error/ErrorOccurred";
import { useQueryClient } from "@tanstack/react-query";
import { Link} from "react-router-dom";

const Posts = ({
  posts,
  error,
  setError,
  onPostClick,
  filterBy,
  isLoading,
  setCurrentPageIndex,
  selectedSchool,
  hasMorePosts,
}) => {
  // console.log(posts)http://localhost:5174/home
  const [sortedPostsByTime, setSortedPostsByTime] = useState([]);
  const lastPostRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  
  const queryClient=useQueryClient()

 
  // useEffect(() => {
  //   if (posts.length === 0) return;
  //   let allPosts = document.querySelector(".posts");
  //   // console.log(allPosts);
  //   // if (!allPosts || allPosts.length === 0) return;
  //   let lastPost = allPosts.lastChild;
  //   // console.log(lastPost);
  //   if (!lastPost) return;
    


  //   const observer = new IntersectionObserver(([entry]) => {
  //     setIsIntersecting(entry.isIntersecting);
  //   });
  //   // console.log("loading1");
  //   observer.observe(lastPost);
  //   return () => {
  //     observer.disconnect();
  //     setIsLoadingMorePosts(false);
  //     // console.log("done");
  //   };
  // }, [posts, isIntersecting]);

  // useEffect(() => {
  //   setIsLoadingMorePosts(false);

  //   if (isIntersecting && hasMorePosts) {
  //     setIsLoadingMorePosts(true);
  //     console.log("loading2");

  //     setCurrentPageIndex((prevPageIndex) => prevPageIndex + 1);
  //   }
  // }, [isIntersecting]);

  useEffect(() => {
    sortPosts();
  }, [posts, filterBy]);

  const sortPosts = async () => {
    let postsToBeSorted = posts;
    const sortedPosts = await postsToBeSorted.sort((post1, post2) => {
      let post1date = new Date(post1.created_at);
      let post2date = new Date(post2.created_at);

      return post1date > post2date ? -1 : post1date < post2date ? 1 : 0;
    });
    setSortedPostsByTime(sortedPosts);
  };
  if(error && posts.length<=0){
    return <ErrorOccurred 
            setError={()=>{
                   queryClient.invalidateQueries({queryKey:['posts']})
                }
            }
          />

    
  }
  if (isLoading) return <Spinner />;
  
  return (
    <div className="pb-[29px] posts transition duration-300 ease-linear">
      {sortedPostsByTime.map((post, index) => {
        let { id, post_type, user, content, created_at, images } = post;
        if (sortedPostsByTime.length === index + 1) {
          return (
            <div key={id} id={`${id}`} ref={lastPostRef} className="text-base post mt-2">
              <div
                className={`mx-4  md:mx-16 p-3 transition-all duration-300 ease-linear  ${
                  selectedSchool.toLowerCase() != "all"
                    ? `b${post_type} rounded-lg`
                    : "border-b border-y-[#4B5563]"
                }`}
              >
                <HomeInfo
                  school={user.school}
                  name={user.generated_username}
                  created_at={created_at}
                />
                <PostType post_type={post_type} />
                <div onClick={() => onPostClick(post, index)}>
                  <Gist content={content} images={images} />
                </div>

                <GistLinks post={post} onPostClick={onPostClick} />
              </div>
            </div>
          );
        }
        return (
          <div key={id} id={`${id}`} className="text-base mt-2">
            <div
              className={`mx-4  md:mx-16 p-3 transition-all duration-300 ease-linear  ${
                selectedSchool.toLowerCase() != "all"
                  ? `b${post_type} rounded-lg`
                  : "border-b border-y-[#4B5563]"
              }`}
            >
              <HomeInfo
                school={user.school}
                name={user.generated_username}
                created_at={created_at}
              />
              <PostType post_type={post_type} />
              <Link to={`/comment/${id}`} onClick={() => onPostClick(post)}>
                <Gist content={content} images={images} showFullGist={true} />
              </Link>

              <GistLinks post={post} onPostClick={onPostClick} />
            </div>
          </div>
        );
      })}
      {isLoadingMorePosts && (
        <div className="grid place-content-center py-4">
          <FaSpinner color="ff0000" className=" animate-spin text-3xl" />
        </div>
      )}
    </div>
  );
};

export default Posts;
