/* eslint-disable react/prop-types */
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import HomeHeader from "./homeHeader";
import HomeTabs from "./homeTabs";
import CreatePostBtn from "./createPostBtn";
import CreatePostPage from "./createPostPage";
import Profile from "../../private/dashboard/Profile";
import NotificationButton from "./NotificationButton";
import HomeFooter from "./homeFooter";
import Trending from "./trending/Trending";
import Posts from "./posts";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiBookOpen, FiGlobe } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import Spinner from "../../common/Spinner";

import { useAuthContext } from "../../../contexts/AuthContext";
import { useErrorContext } from "../../../contexts/ErrorContext";
import { useHomeTabContext } from "../../../contexts/homeTabContext";
import { useWebSocket } from "../../../contexts/webSocketContext"

import { useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, getUser } from "../../../utils/user";

import { useRestoreScroll } from "../../../utils/restoreScroll";
import { queryClient } from "../../../App";

const Home = () => {
  const [createPost, setCreatePost] = useState(false);
  const [profilePage, setProfilePage] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [isAll, setIsAll] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("ALL");
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  
  const { isReceivedData, setIsRecievedData } = useWebSocket()

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { selectedTab } = useHomeTabContext();
  const { key, userDetails } = useAuthContext();
  const { setAppError } = useErrorContext();

    useEffect(() => {
    // Trigger the query when myState changes
    queryClient.invalidateQueries('queryKey');
  }, [isReceivedData, queryClient])
  //using react-query to handle fetching posts
    const {
      isPending: isLoading,
      data: postsResult,
      error,
      fetchNextPage,
      hasNextPage, 
      isFetchingNextPage,
    } = useInfiniteQuery({
      queryKey: ["posts"],
      initialPageParam: 1,
      queryFn: getPosts,
      getNextPageParam(lastPage, allPages) {
        return lastPage.data.next && allPages.length + 1;
      },
    });
    const restoreScroll = useRestoreScroll("home-" + selectedTab, selectedTab);

  //memoized destructured data to prevent infinite rerender issue
  // Note: it later occured to me that, alternatively, one could access the "data" properties directly rather than destructuring to avoid using memoization.
  const initialPosts = useMemo(
    () =>
      postsResult !== undefined
        ? postsResult.pages.map((page) => [...page.data.results])
        : postsResult,
    [postsResult]
  );

  //using react-query to handle fetching userdetails
  // const { data: userDataResult, error: userDetailsError } = useQuery({
  //   queryKey: ["userDetails"],
  //   queryFn: ()=>getUser({queryKey:[null, key]})
  // });

  // //memoized destructured data to prevent infinite rerender issue
  // const userDetails = useMemo(
  //   () => (userDataResult ? { ...userDataResult.data } : userDataResult),
  //   [userDataResult]
  // );

  const handlePostClick = (post, index) => {
    setSelectedPost(post);
    setSelectedPostIndex(post);
  };

  //posts initialization
  useEffect(() => {
    let allPosts =
      initialPosts &&
      initialPosts.flat().filter((post) => post.school === null);
    setPosts(allPosts);
  }, [postsResult]);

  useEffect(() => {

    if (userDetails != null && !error) {
    //  fetchPosts()
    }
    if (Boolean(posts)) {
      //The posts is fetched and its stored in state using the tanstack/react-query Api
      // setInitialPosts([...initialPosts, ...posts]);
      setHasMorePosts(Boolean(postsResult));
      setAppError(null);
    } else if (error) {
      console.log(error);
      setAppError(error);
    }
  }, [currentPageIndex, key, userDetails, error, selectedTab]);

  //Refetch posts after posting
  const reloadPosts = async () => {
    await queryClient.refetchQueries({
      queryKey: ["posts"],
      initialPageParam: 1,
      exact: true,
      type: "active",
    })
    let allPosts = initialPosts.filter((post) => post.school === null)
    setPosts(allPosts)
  }
  //School filtering
  let handleSchoolFilter = (school) => {
    setSelectedSchool(school.toUpperCase());
    if (school !== "all" && initialPosts.flat().length > 0) {
      let schoolPosts = initialPosts
        .flat()
        .filter(
          (post) =>
            post.school &&
            post.school.school_acronym.toLowerCase() === school.toLowerCase()
        );
      setPosts(schoolPosts);
    } else {
      let allPosts = initialPosts.flat().filter((post) => post.school === null);
      setPosts(allPosts);
    }
  }
  return (
    <>
      {!key ? <Spinner />: (
        <>
            <div className="grow">
              <Profile
                setProfilePage={setProfilePage}
                profilePage={profilePage}
                user={userDetails.user}
            />
            <CreatePostPage
              reloadPosts={reloadPosts}
              setCreatePost={setCreatePost}
              createPost={createPost}
            />
            <div className="sticky top-0 bg-black pt-4">
              <div className="flex justify-between items-center">
                <HomeHeader
                  setProfilePage={setProfilePage}
                  userDetails={userDetails}
                />
                <NotificationButton />
              </div>

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
                          userDetails?.user?.school?.school_acronym
                        )
                      }
                      className="flex justify-between p-2 cursor-pointer items-center mb-2"
                    >
                      <FiBookOpen size={20} fill="#752626" />
                      <p
                        className="opacity-70"
                        style={{ textShadow: "0 0 2px #490A0A" }}
                      >
                        {userDetails && userDetails?.user?.school?.school_acronym}
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
      )};
    </>
  )
}
export default React.memo(Home)