// import axios from "../../../../services/axios";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
// import { FaDotCircle } from "react-icons/fa";
import {
  HiChat,
  HiDotsVertical,
  HiEye,
  HiFire,
  HiShare,
  HiUser,
} from "react-icons/hi";
import Spotlight from "./Spotlight";
import Gist from "../gist";
import GistLinks from "../gistLinks";
import { PostType } from "../postType";
import timeGap from "../../../../services/dateCheck";

const Trending = ({ posts }) => {
  // let postsTobeSorted = useMemo(() => posts, []);
  const [trendingPostsByComments, setTrendingPostsByComments] = useState([]);
  const [trendingPostsByViews, setTrendingPostsByViews] = useState([]);
  const [trendingPostsByLikes, setTrendingPostsByLikes] = useState([]);

  useEffect(() => {
    getPosts();
  }, [posts]);
  let getPosts = async () => {
    let likeSortedPosts = await posts.sort((post1, post2) =>
      post1.likes.length > post2.likes.length
        ? -1
        : post1.likes.length < post2.likes.length
        ? 1
        : 0
    );
    let commentSortedPosts = await posts.sort((post1, post2) =>
      post1.comments.length > post2.comments.length
        ? -1
        : post1.comments.length < post2.comments.length
        ? 1
        : 0
    );

    let viewsSortedPosts = await posts.sort((post1, post2) =>
      post1.views > post2.views ? -1 : post1.views < post2.views ? 1 : 0
    );
    setTrendingPostsByLikes(likeSortedPosts);

    setTrendingPostsByComments(commentSortedPosts.slice(0, 10));
  };
  return (
    <div>
      <Spotlight posts={trendingPostsByComments} />
      <div>
        {trendingPostsByLikes.map((post) => {
          let { id, content, user, shared, post_type, created_at } = post;
          let { generated_username, picture, school } = user;
          return (
            <div
              key={id}
              className="px-8 py-4 border-t-2 border-[rgba(255,255,255,.5)]"
            >
              <div className="flex gap-2 items-center">
                {picture ? <img src="" alt="dp" /> : <HiUser />}
                <h5 className="font-bold">{generated_username}</h5>{" "}
                <span className="w-1 h-1 bg-white opacity-50 rounded-full" />
                <span className="opacity-50">
                  {school === null ? "ballers" : school.school_acronym}
                </span>
                <span className="w-1 h-1 bg-white opacity-50 rounded-full" />
                <span className="opacity-50">{timeGap(created_at)}</span>
                <HiDotsVertical className="opacity-50 ml-auto" />
              </div>
              <PostType post_type={post_type} />

              <Gist content={content} />
              <GistLinks post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
