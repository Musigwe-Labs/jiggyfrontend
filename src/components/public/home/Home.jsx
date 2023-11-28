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
        setError(err.message);
      }
    };
    fetchPosts();
  }, [currentPageIndex]);
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
      } catch (error) {}
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
