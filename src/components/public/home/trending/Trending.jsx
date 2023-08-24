import axios from "../../../../services/axios";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
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

const Trending = () => {
  const [trendingPostsByComments, setTrendingPostsByComments] = useState([]);
  const [trendingPostsByViews, setTrendingPostsByViews] = useState([]);
  const [trendingPostsByLikes, setTrendingPostsByLikes] = useState([]);
  const getPosts = useCallback(async () => {
    console.log("fetching...");
    let response = await axios.get("/annon/posts/");
    let posts = await response.data;
    console.log("sorting...");

    let commentSortedPosts = posts.sort((post1, post2) =>
      post1.comments.length > post2.comments.length
        ? -1
        : post1.comments.length < post2.comments.length
        ? 1
        : 0
    );
    let likeSortedPosts = posts.sort((post1, post2) =>
      post1.likes.length > post2.likes.length
        ? -1
        : post1.likes.length < post2.likes.length
        ? 1
        : 0
    );
    let viewsSortedPosts = posts.sort((post1, post2) =>
      post1.views > post2.views ? -1 : post1.views < post2.views ? 1 : 0
    );
    console.log(commentSortedPosts);
    setTrendingPostsByComments(commentSortedPosts.slice(0, 10));
    setTrendingPostsByLikes(likeSortedPosts);
  }, []);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <Spotlight posts={trendingPostsByComments} />
      <div>
        {trendingPostsByLikes.map(
          ({
            id,
            content,
            likes,
            comments,
            views,
            user,
            shared,
            post_type,
          }) => {
            let { generated_username, picture, school } = user;
            return (
              <div key={id} className="px-8 py-4 border-t-2 border-[rgba(255,255,255,.5)]">
                <div className="flex gap-2 items-center">
                  {picture ? <img src="" alt="dp" /> : <HiUser />}
                  <h5 className="font-bold">{generated_username}</h5>{" "}
                  <span className="w-1 h-1 bg-white opacity-50 rounded-full" />
                  <span className="opacity-50">{school}</span>
                  <span className="w-1 h-1 bg-white opacity-50 rounded-full" />
                  <span className="opacity-50">17h</span>
                  <HiDotsVertical className="opacity-50 ml-auto" />
                </div>
                <Gist post={content} />
                <div className="flex  justify-around items-center">
                  <div className="flex gap-2 items-center">
                    <HiChat />
                    <span>{comments.length}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <HiFire />
                    <span>{likes.length}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <HiEye />
                    <span>{views}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <HiShare />
                    <span>{shared.length}</span>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Trending;
