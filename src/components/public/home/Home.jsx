/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useLayoutEffec, useRef} from "react";
import { Outlet, Route, Router, Routes, useNavigate } from "react-router-dom";
import HomeHeader from "./homeHeader";
import HomeTabs from "./homeTabs";
import CreatePostBtn from "./createPostBtn";
import CreatePostPage from "./createPostPage";
import { Profile } from "../../private/dashboard/Profile";
import HomeFooter from "./homeFooter";
import Trending from "./trending/Trending";
import Comment from "./comments";
import Posts from "./posts";
import axios from "../../../services/axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiBookOpen, FiGlobe, FiPhone } from "react-icons/fi";
import { GiDualityMask } from "react-icons/gi";
import { BsCheckCircleFill, BsFileWordFill } from "react-icons/bs";
import Spinner from '../../common/Spinner'
import { useAuthContext } from "../../../contexts/AuthContext";
import { useErrorContext } from "../../../contexts/ErrorContext";
import ChatCircle from "../../../assets/chatCircle.svg"
import Connect from "../../../assets/Connect.svg"
import FireSimple from "../../../assets/fireSimple.svg"
import Eye from "../../../assets/Eye.svg"

import { useQuery, useQueryClient, QueryClient} from '@tanstack/react-query'
import { getPosts, getUser } from "../../../utils/user";
import { saveScrollPosition, setScrollPosition } from "../../../utils/scrollPage";

const Home = () => {
  const [createPost, setCreatePost] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [isAll, setIsAll] = useState(false);
  const [initialPosts, setInitialPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  // const { isRecievedData, setIsRecievedData } = useWebSocket();
  // const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState("");
  // const [userDetails, setUserDetails] = useState();
  const [selectedSchool, setSelectedSchool] = useState("ALL");
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(undefined);

  const navigate = useNavigate();
  const { key } =useAuthContext()
  const {setAppError} = useErrorContext()
  const homeRef=useRef()

  //using react-query to handle fetching posts 
const {isPending:isLoading, data:postsResult, error }=useQuery({
    queryKey:['posts', currentPageIndex], 
    queryFn:getPosts
  })
  console.log(postsResult)
  //memoized destructured data to prevent infinite rerender issue
  const posts = useMemo(() => (postsResult? [...postsResult.data.results] : postsResult) , [postsResult]); 
  console.log(posts)

    //using react-query to handle fetching userdetails 
  const { data:userDataResult, error:userDetailsError }=useQuery({
    queryKey:['userDetails', key], 
    queryFn:getUser
  })
    //memoized destructured data to prevent infinite rerender issue
  const userDetails= useMemo(() => (userDataResult? {...userDataResult.data} : userDataResult) , [userDataResult]); 


  const handlePostClick = (post, index) => {
    setSelectedPost(post);
    setSelectedPostIndex(post);
  };
  

  // useLayoutEffect(()=>{
  //   console.log('tab ', selectedTab)
  //   if(selectedTab =='all'){
  //     console.log('heheh')
  //     setScrollPosition('home') 
  //   }else{
  //     setScrollPosition('home-trending')
  //   }
  // })

  useEffect(() => {
    console.log('tab ', selectedTab)
    if(selectedTab =='all'){
      console.log('heheh')
      // window.scrollBy(0, sessionStorage.getItem('home'))
      // setScrollPosition('home') 
      homeRef.current.scrollBy(0, sessionStorage.getItem('home'))

    }else{
      // setScrollPosition('home-trending')
      // window.scrollBy(0, 200)
      // window.scrollBy(0, sessionStorage.getItem('home-trending'))
      homeRef.current.scrollBy(0, sessionStorage.getItem('home-trending'))

    }
  }, [selectedTab]);
  
  useEffect(() => {
      if(key==null){
        navigate('/login')
      }
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            `annon/posts/paginated/?page=${currentPageIndex}`
            );
          setAppError(null)
          setInitialPosts([...initialPosts, ...response.data.results]);
          // setPosts([...posts, ...response.data.results]);
          setHasMorePosts(Boolean(response.data.next));
          // setIsRecievedData(false);init
          // setIsLoading(false);
        } catch (err) {
          console.log('%c error in loading paginated posts in useEffect', err )
          // setError(err.message);
          setAppError(err)
        }
      }
    

    if(userDetails!=null && !error){
      // fetchPosts()
    } 

    if(Boolean(posts)){
      //The posts is fetched and its stored in state using the tanstack/react-query Api
      setInitialPosts([...initialPosts, ...posts]);
      setHasMorePosts(Boolean(postsResult))
      setAppError(null)
    }else if(error){
      setAppError(error)
    } 

    if(Boolean(userDetails)){
    }else if(userDetailsError){
      setAppError(userDetailsError)
    }

  }, [currentPageIndex, key, userDetails, error]);

  //Ajax
  const reloadPosts = () => {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://jiggybackend.com.ng/annon/posts?page=${currentPageIndex}`,
      true
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        let response = JSON.parse(this.response);
        setPosts(response.results);
      }
    };
    xhr.send();
  };

  //School filtering
  let handleSchoolFilter = (school) => {
    setSelectedSchool(school.toUpperCase());
    if (school !== "all" && initialPosts.length > 0) {
      let schoolPosts = initialPosts.filter(
        (post) =>
          post.user.school &&
          post.user.school.school_acronym.toLowerCase() === school.toLowerCase()
      );
      setPosts(schoolPosts);
    } else setPosts(initialPosts);
  };

  if(!key){
    return <Spinner />
  }

  if (createPost) {
    return (
      <CreatePostPage
        reloadPosts={reloadPosts}
        setCreatePost={setCreatePost}
      />
    );
  }

  return (
    <>
      <div className="grow" ref={homeRef}>
        {profilePage ? (
          <Profile setProfilePage={setProfilePage} userDetails={userDetails} />
        ) : (
          ""
        )}
        <div className="sticky top-0 bg-black">
          <HomeHeader
            setProfilePage={setProfilePage}
            userDetails={userDetails}
          />

          <HomeTabs setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

          {userDetails && (
            <div className="my-2 ml-4 flex relative">
              <span
                className="flex items-center border-b-2 px-1 border-y-[#00CCCC]"
                onClick={() => setIsAll(!isAll)}
              >
                <p className="text-[#00CCCC] font-bold mr-1">
                  {selectedSchool}
                </p>
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
                <div
                  className="flex justify-between p-2 cursor-pointer items-center"
                  onClick={() => handleSchoolFilter("all")}
                >
                  <FiGlobe size={20} color="#752626" />
                  <p
                    className="opacity-70"
                    style={{ textShadow: "0 0 2px #490A0A" }}
                  >
                    ALL
                  </p>
                  <BsCheckCircleFill
                    fill="#8D6666"
                    className="border-[1px] border-solid border-[#490A0A] rounded-full"
                  />
                </div>
                <div
                  onClick={() =>
                    handleSchoolFilter(userDetails.user.school.school_acronym)
                  }
                  className="flex justify-between p-2 cursor-pointer items-center mb-2"
                >
                  <FiBookOpen size={20} fill="#752626" />
                  <p
                    className="opacity-70"
                    style={{ textShadow: "0 0 2px #490A0A" }}
                  >
                    {userDetails && userDetails.user.school.school_acronym}
                  </p>
                  <BsCheckCircleFill
                    fill="#BA3131"
                    className="border-[1px] border-solid border-[#490A0A] rounded-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* test here */}
      {/* <div className="mx-4  md:mx-16 p-3 transition-all duration-300 ease-linear  border-b border-y-[#4B5563]">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img className="w-6 rounded-3xl mr-3" src="/src/assets/profile_pics/pic1.png" alt="profile-img" />
            <h4 className="text-white mr-2 text-base font-bold">Richard_763</h4>
            <span className="border border-gray-400"></span>
            <p className="px-1 text-sm text-gray-400">RSU</p>
            <span className="border border-gray-400"></span>
            <span className="text-sm text-gray-400 ml-2">2ds</span>
            </div>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className="cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M456 231a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path></svg>
            </div>
            <p className="text-base text-[7.5px] w-fit mt-2 border-[2px] font-semibold px-2 rounded-full Question">Question</p>
            <a href="/comment/112">
              <div>
                <p className="cursor-pointer break-words false text-white mt-3  overflow-scroll">hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio consequatur voluptatibus quae culpa incidunt necessitatibus eos error vero reiciendis rerum? Impedit labore laboriosam,
                </p>
              </div>
            </a>
            <div className="more flex justify-between items-center ">
              <img src={ChatCircle} width={15} height={15} alt="comments" />
              
              {/* <img src={FireSimple} width={17} height={20} alt="votes" /> */}
              {/* <img src={Eye} height={20} alt="views" />
              <img src={Connect} width={15} height={15} alt="share" />

            </div>
      
     
      </div> */} 
          {selectedTab === "all" ? (
            <Posts
              posts={posts || []}
              error={error}
              setError={null}
              onPostClick={handlePostClick}
              isLoading={isLoading}
              setCurrentPageIndex={setCurrentPageIndex}
              selectedSchool={selectedSchool}
              hasMorePosts={hasMorePosts}
            />
          ) : (
            <Trending posts={posts} />
          )}
        

        {userDetails && <CreatePostBtn setCreatePost={setCreatePost} />}
      </div>
      
      <HomeFooter />
    </>
  );
};

export default Home;
