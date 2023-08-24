import React from "react";
import {
  HiChat,
  HiDotsVertical,
  HiEye,
  HiFire,
  HiShare,
  HiUser,
} from "react-icons/hi";

const Spotlight = ({ posts }) => {
  return (
    <div>
      <h2>Spotlight</h2>
      <div>
        {posts.map(({ id, content, likes, comments, views, user, shared, post_type }) => {
          let { generated_username, picture, school } = user;
          let date = Date.now();
          return (
            <div
              key={id}
              className="px-6 py-4 shadow-[0px_4px_4px_0px_#00000040] w-5/6 bg-[#3A1A1A] rounded-xl "
            >
              <div className="flex gap-2 items-center">
              {picture ? <img src="" alt="dp" /> : <HiUser />}
                <h5 className="font-bold">{generated_username}</h5>{" "}
                <span className="w-1 h-1 bg-white opacity-50 rounded-full" />
                <span className="opacity-50">{school.school_acronym}</span>
                <span className="w-1 h-1 bg-white opacity-50 rounded-full" />
                <span className="opacity-50">17h</span>
              </div>
              <p>{post_type}</p>
              <p className="py-4">{content}</p>
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
                <div>
                  <HiShare />
                  <span>{shared.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spotlight;
