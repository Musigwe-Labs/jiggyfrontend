/* eslint-disable react/prop-types */
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Gist from "./gist";
import GistLinks from "./gistLinks";
import HomeInfo from "./homeInfo";
import { PostType } from "./postType";
import Spinner from "../../common/Spinner";
import { HiRefresh } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa6";
import ErrorOccurred from "../../error/ErrorOccurred";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Posts = ({
  posts,
  error,
  setError,
  onPostClick,
  filterBy,
  isLoading,
  selectedSchool,
  scrollFetch,
}) => {
  const [sortedPostsByTime, setSortedPostsByTime] = useState([]);
  const lastPostRef = useRef();
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  let { fetchNextPage, hasNextPage, isFetchingNextPage } = scrollFetch;
  const queryClient = useQueryClient();

  //infinte scrolling
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (lastPostRef.current) lastPostRef.current.disconnect();
      lastPostRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) lastPostRef.current.observe(node);
    },
    [isLoading, hasNextPage]
  );

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
  if (error && posts.length <= 0) {
    return (
      <ErrorOccurred
        setError={() => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }}
      />
    );
  }
  if (isLoading) return <Spinner />;

  return (
    <div className="mb-4">
      <div
        // onEndReached={() => !isFetching && fetchNextPage()}
        className="pb-[29px] posts transition duration-300 ease-linear"
      >
        {/* <List /> */}
        {sortedPostsByTime.map((post, index) => {
          let { id, post_type, user, content, created_at, images } = post;
          return (
            <div
              key={id}
              id={`${id}`}
              className="text-base mt-2"
              ref={
                sortedPostsByTime.length === index + 1 ? lastElementRef : null
              }
            >
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

        {/* {isLoadingMorePosts && (
        <div className="grid place-content-center py-4">
          <FaSpinner color="ff0000" className=" animate-spin text-3xl" />
        </div>
      )} */}
      </div>
      {isFetchingNextPage && (
        <div className="flex gap-2 justify-center items-center">
          <span className="w-3 h-3 rounded-full transition-all ease-linear bg-[#f33f5e] animate-bounce duration-300"></span>
          <span
            className="w-3 h-3 rounded-full transition-all ease-linear bg-[#ff008a9e] animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
          <span
            className="w-3 h-3 rounded-full transition-all ease-linear bg-[#b416fe66] animate-bounce"
            style={{ animationDelay: "600ms" }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default Posts;
