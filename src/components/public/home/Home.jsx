/* eslint-disable react/prop-types */
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import HomeHeader from "./homeHeader";
import HomeTabs from "./homeTabs";
import CreatePostBtn from "./createPostBtn";
import CreatePostPage from "./createPostPage";
import { Profile } from "../../private/dashboard/Profile";
import HomeFooter from "./homeFooter";
import Trending from "./trending/Trending";
import Posts from "./posts";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiBookOpen, FiGlobe, FiPhone } from "react-icons/fi";
import { GiDualityMask } from "react-icons/gi";
import { BsCheckCircleFill, BsFileWordFill } from "react-icons/bs";
import Spinner from "../../common/Spinner";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useErrorContext } from "../../../contexts/ErrorContext";
import ChatCircle from "../../../assets/chatCircle.svg";
import Connect from "../../../assets/Connect.svg";
import FireSimple from "../../../assets/fireSimple.svg";
import Eye from "../../../assets/Eye.svg";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getPosts, getUser } from "../../../utils/user";
import {
  mountScrollListener,
  unmountScrollListener,
  scrollPage,
} from "../../../utils/scrollPage";
import { useRestoreScroll } from "../../../utils/restoreScroll";
import { useHomeTabContext } from "../../../contexts/homeTabContext";
import { queryClient } from "../../../App";

const Home = () => {
  const [createPost, setCreatePost] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [isAll, setIsAll] = useState(false);
  const [posts, setPosts] = useState([]);
  const { selectedTab } = useHomeTabContext();
  const [selectedSchool, setSelectedSchool] = useState("ALL");
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);

  const navigate = useNavigate();
  const { key } = useAuthContext();
  const { setAppError } = useErrorContext();

  //using react-query to handle fetching posts
  const {
    isPending: isLoading,
    data: postsResult,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // console.log(lastPage.data.next);
    },
  });
  const restoreScroll = useRestoreScroll("home-" + selectedTab);

  //memoized destructured data to prevent infinite rerender issue
  // Note: it later occured to me that, alternatively, one could access the "data" properties directly rather than destructuring to avoid using memoization.
  const initialPosts = useMemo(
    () =>
      postsResult
        ? postsResult.pages.map((page) => [...page.data.results])
        : postsResult,
    [postsResult]
  );
  // console.log(initialPosts);
  //using react-query to handle fetching userdetails
  const { data: userDataResult, error: userDetailsError } = useQuery({
    queryKey: ["userDetails", key],
    queryFn: getUser,
  });

  //memoized destructured data to prevent infinite rerender issue
  const userDetails = useMemo(
    () => (userDataResult ? { ...userDataResult.data } : userDataResult),
    [userDataResult]
  );

  const handlePostClick = (post, index) => {
    setSelectedPost(post);
    setSelectedPostIndex(post);
  };

  //infinite scrolling
  const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (!(scrollTop + clientHeight >= scrollHeight - 20)) {
      return;
    }

    !isFetching && fetchNextPage();
    console.log(postsResult);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  // const handleScroll = async() => {
  //   if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
  //     console.log("ooh");
  //     return;
  //   }
  //   console.log("yeah");
  //   // setCurrentPageIndex(prevIndex =>prevIndex+1)
  //   !isFetching && fetchNextPage()
  // }
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isLoading]);

//posts initialization
  useEffect(() => {
    let allPosts = initialPosts && initialPosts.flat().filter((post) => post.school === null);
    setPosts(allPosts);
  }, [postsResult]);

  useEffect(() => {
    if (key == null) {
      navigate("/login");
    }

    if (userDetails != null && !error) {
      // fetchPosts()
    }
    if (Boolean(posts)) {
      //The posts is fetched and its stored in state using the tanstack/react-query Api
      // setInitialPosts([...initialPosts, ...posts]);
      setHasMorePosts(Boolean(postsResult));
      setAppError(null);
    } else if (error) {
      setAppError(error);
    }

    if (Boolean(userDetails)) {
    } else if (userDetailsError) {
      setAppError(userDetailsError);
    }
   
  }, [currentPageIndex, key, userDetails, error, selectedTab]);

  //Refetch posts after posting
  const reloadPosts = async () => {
    await queryClient.refetchQueries({
      queryKey: ["posts", 1],
      exact: true,
      type: "active",
    });
    let allPosts = initialPosts && initialPosts.flat().filter((post) => post.school === null);
    setPosts(allPosts);
  };

  //School filtering
  let handleSchoolFilter = (school) => {
    setSelectedSchool(school.toUpperCase());
    if (school !== "all" && initialPosts.flat().length > 0) {
      let schoolPosts = initialPosts.flat().filter(
        (post) =>
          post.school &&
          post.school.school_acronym.toLowerCase() === school.toLowerCase()
      );
      setPosts(schoolPosts);
    } else {
      let allPosts = initialPosts.flat().filter((post) => post.school === null);
      setPosts(allPosts);
    }
  };

  if (!key) {
    return <Spinner />;
  }

  if (createPost) {
    return (
      <CreatePostPage
        userSchool={userDetails.user.school}
        reloadPosts={reloadPosts}
        setCreatePost={setCreatePost}
      />
    );
  }

  return (
    <>
      {!key ? (
        <Spinner />
      ) : createPost ? (
        <CreatePostPage
          reloadPosts={reloadPosts}
          setCreatePost={setCreatePost}
        />
      ) : (
        <>
          <div className="grow">
            {profilePage ? (
              <Profile
                setProfilePage={setProfilePage}
                userDetails={userDetails}
              />
            ) : (
              ""
            )}
            <div className="sticky top-0 bg-black">
              <HomeHeader
                setProfilePage={setProfilePage}
                userDetails={userDetails}
              />
              <HomeTabs />

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
                    className={`border rounded-3xl rounded-tl-none absolute top-full transition-[all_.3s_ease] bg-[linear-gradient(0deg,_#000000d3,_#000000d3),linear-gradient(0deg,_#490A0Ad3,_#490A0Ad3)] w-32 overflow-hidden ${
                      !isAll
                        ? "h-0 border-transparent"
                        : "h-24 border-[#490A0A]"
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
                        handleSchoolFilter(
                          userDetails.user.school.school_acronym
                        )
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
                posts={posts || []}
                error={error}
                setError={null}
                onPostClick={handlePostClick}
                isLoading={isLoading}
                setCurrentPageIndex={setCurrentPageIndex}
                selectedSchool={selectedSchool}
                hasMorePosts={hasMorePosts}
                scrollFetch={{
                  fetchNextPage,
                  hasNextPage,
                  isFetching,
                  isFetchingNextPage,
                }}
              />
            ) : (
              <Trending posts={posts} />
            )}

            {userDetails && <CreatePostBtn setCreatePost={setCreatePost} />}
          </div>
          <HomeFooter />
        </>
      )}
    </>
  );
};

export default React.memo(Home);
