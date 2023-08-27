// import axios from "../../../../services/axios";
import React, { useEffect, useState } from "react";
import { HiDotsVertical, HiUser } from "react-icons/hi";
import Spotlight from "./Spotlight";
import Gist from "../gist";
import GistLinks from "../gistLinks";
import { PostType } from "../postType";
import timeGap from "../../../../services/dateCheck";
import { useNavigate } from "react-router-dom";

const Trending = ({ posts, onPostClick }) => {
  const [trendingPostsByComments, setTrendingPostsByComments] = useState([]);
  // const [trendingPostsByViews, setTrendingPostsByViews] = useState([]);
  const [trendingPostsByLikes, setTrendingPostsByLikes] = useState([]);
  // let navigate = useNavigate();
  useEffect(() => {
    getPosts();
    // return () => window.location.pathname.replace("trending", "")
  }, [posts]);
  let getPosts = async () => {
    let likeSortedPosts = await posts.sort((post1, post2) =>
      post1.likes.length > post2.likes.length && post1.views > post2.views
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

    // let viewsSortedPosts = await posts.sort((post1, post2) =>
    //   post1.views > post2.views ? -1 : post1.views < post2.views ? 1 : 0
    // );
    setTrendingPostsByLikes(likeSortedPosts);
    setTrendingPostsByComments(commentSortedPosts.slice(0, 10));
  };
  return (
    <div>
      <Spotlight posts={trendingPostsByComments} onPostClick={onPostClick} />
      <div className="px-8">
        {trendingPostsByLikes.map((post) => {
          let { id, content, user, post_type, created_at } = post;
          let { generated_username, picture, school } = user;
          return (
            <div
              key={id}
              className=" py-4 border-t-[1px] border-[rgba(255,255,255,.5)]"
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
              <div onClick={() => onPostClick(post)}>
                <Gist content={content} />
              </div>
              <GistLinks post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;