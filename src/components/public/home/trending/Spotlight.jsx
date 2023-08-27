import React from "react";
import {
  HiChat,
  HiDotsVertical,
  HiEye,
  HiFire,
  HiShare,
  HiUser,
} from "react-icons/hi";
import { PostType } from "../postType";
import GistLinks from "../gistLinks";
import Gist from "../gist";
import timeGap from "../../../../services/dateCheck";

const Spotlight = ({ posts, onPostClick }) => {
  return (
    <div className="my-4 mx-4">
      <h2 className="font-bold text-2xl my-2 text-[#00CCCC]">Spotlight</h2>
      <div className="grid grid-cols-[repeat(10,_85vw)] gap-4 w-full overflow-auto">
        {posts.map((post) => {
          let { id, content, user, post_type, created_at } = post;
          let { generated_username, picture, school } = user;
          return (
            <div
              key={id}
              className={`px-6 py-4 shadow-[0px_4px_4px_0px_#00000040] flex flex-col rounded-xl ${
                post_type === "Confession" || post_type === "Cruise"
                  ? "from-[#B416FE4A] from-[40%] via-[#F33F5E]   to-[#F90000D9]  bg-gradient-to-br"
                  : "bg-[#3A1A1A]"
              } `}
            >
              <div className="flex gap-2 items-center">
                {picture ? <img src="" alt="dp" /> : <HiUser />}
                <h5 className="font-bold">{generated_username}</h5>{" "}
                <span className="w-1 h-1 bg-white opacity-50 rounded-full" />
                <span className="opacity-50">
                  {school === null ? "Bagger" : school.school_acronym}
                </span>
                <span className="w-1 h-1 bg-white opacity-50 rounded-full" />
                <span className="opacity-50">{timeGap(created_at)}</span>
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

export default Spotlight;
