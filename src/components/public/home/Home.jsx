/* eslint-disable react/prop-types */
import { useState, useEffect, createContext, useContext } from "react";
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
// import { useWebSocket } from "../../../contexts/webSocketContext";
import { AuthContext } from "../../../contexts/AuthContext";

const Home = () => {
  const [createPost, setCreatePost] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [isAll, setIsAll] = useState(false);
  const [posts, setPosts] = useState([]);
  const [initialPosts, setInitialPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  // const { isRecievedData, setIsRecievedData } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [selectedSchool, setSelectedSchool] = useState("ALL");
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(undefined);

  const navigate = useNavigate();
  const { key } = useContext(AuthContext);

  const handlePostClick = (post, index) => {
    setSelectedPost(post);
    setSelectedPostIndex(post);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `annon/posts/paginated/?page=${currentPageIndex}`
        );
        setInitialPosts([...initialPosts, ...response.data.results]);
        setPosts([...posts, ...response.data.results]);
        setHasMorePosts(Boolean(response.data.next));
        // setIsRecievedData(false);

        setIsLoading(false);
      } catch (err) {
        console.log('%c error in home .jsx', 'brown' )
        setError(err.message);
      }
    };
    fetchPosts();
  }, [currentPageIndex, error]);
  useEffect(() => {
    const headers = {
      Authorization: `Token ${key}`,
    };
    const fetchUser = async () => {
      try {
        if (localStorage.getItem("login") !== null) {
          const user_response = await axios.get("account/annonyuser/", {
            headers,
          });
          setUserDetails(user_response.data);
        }
      } catch (error) {
        navigate('/login')
      }
    };
    fetchUser();
  }, []);

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

  if (createPost) {
    return (
      <CreatePostPage
        reloadPosts={reloadPosts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setCreatePost={setCreatePost}
      />
    );
  }

  return (
    <>
      <div className="grow">
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
      {/* <div class="mx-4  md:mx-16 p-3 transition-all duration-300 ease-linear  border-b border-y-[#4B5563]"><div class="flex justify-between items-center"><div class="flex items-center"><img class="w-6 rounded-3xl mr-3" src="/src/assets/profile_pics/pic1.png" alt="profile-img" /><h4 class="text-white mr-2 text-base font-bold">Richard_763</h4><span class="border border-gray-400"></span><p class="px-1 text-sm text-gray-400">RSU</p><span class="border border-gray-400"></span><span class="text-sm text-gray-400 ml-2">2ds</span></div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M456 231a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 280a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path></svg></div><p class="text-base text-[7.5px] w-fit mt-2 border-[2px] font-semibold px-2 rounded-full Question">Question</p><a href="/comment/112"><div><p class="cursor-pointer break-words false text-white mt-3 max-h-20 text-ellipsis whitespace-normal overflow-hidden ">hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio consequatur voluptatibus quae culpa incidunt necessitatibus eos error vero reiciendis rerum? Impedit labore laboriosam, quos ad accusantium ab hic. Ea maxime corrupti cumque voluptas rerum rem, doloremque obcaecati esse quia tempore unde repellendus aspernatur, placeat suscipit quas quo doloribus nobis fuga?</p></div></a><div class="flex justify-between px-5 mt-4 text-white"><a class="flex items-center cursor-pointer" href="/comment/112"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="cursor-pointer text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z"></path></svg><p class="ml-3">0</p></a><div class="flex items-center cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="false text-2xl cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M393.3 222.1l-.2 10.4c-.8 11.7-7.9 43.4-22.1 54.7 7-15.2 17.3-47.2 10.2-82.7C361.6 107 287.5 65.6 193 50l-17.2-2.2c39.5 47.2 56.1 81.7 49.7 116.8-2.3 12.6-10 23.4-14 31.6 0 0 2.4-12.9 2-28.7-.3-14.2-6.6-31-18-39.6 3.5 18.4-.8 33.5-9.1 47.7-24.7 42.2-85.4 57.8-90.4 135.8v3.8c0 53.7 25.6 99 68.7 125-6.8-12.3-12-35.2-5.7-60.2 4 23.7 14 36 24.9 51.8 8.2 11.7 19.1 19.3 33.1 24.9s31 7.2 47.9 7.2c55.8 0 91.4-18.1 119.1-50.5s32.1-68 32.1-106.4-8.5-60.9-22.8-84.9z"></path></svg><p class="ml-3">1</p></div><div class="flex items-center cursor-pointer"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="cursor-pointer text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg><p class="ml-3">21</p></div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" class="cursor-pointer text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M752 664c-28.5 0-54.8 10-75.4 26.7L469.4 540.8a160.68 160.68 0 0 0 0-57.6l207.2-149.9C697.2 350 723.5 360 752 360c66.2 0 120-53.8 120-120s-53.8-120-120-120-120 53.8-120 120c0 11.6 1.6 22.7 4.7 33.3L439.9 415.8C410.7 377.1 364.3 352 312 352c-88.4 0-160 71.6-160 160s71.6 160 160 160c52.3 0 98.7-25.1 127.9-63.8l196.8 142.5c-3.1 10.6-4.7 21.8-4.7 33.3 0 66.2 53.8 120 120 120s120-53.8 120-120-53.8-120-120-120zm0-476c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52zM312 600c-48.5 0-88-39.5-88-88s39.5-88 88-88 88 39.5 88 88-39.5 88-88 88zm440 236c-28.7 0-52-23.3-52-52s23.3-52 52-52 52 23.3 52 52-23.3 52-52 52z"></path></svg></div>
        </div> */}
          {selectedTab === "all" ? (
            <Posts
              posts={posts}
              error={error}
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
