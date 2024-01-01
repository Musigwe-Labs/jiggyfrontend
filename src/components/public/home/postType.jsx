import React from "react";

export const PostType = ({post_type}) => {
  return (
    <p
      className={`text-[.6rem] w-fit mt-2 border-[2px] font-comicSans px-2 rounded-full ${post_type}`}
    >
      {post_type?.toUpperCase()}
    </p>
  );
};
