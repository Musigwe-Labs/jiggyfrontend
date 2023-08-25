import React from "react";

export const PostType = ({post_type}) => {
  return (
    <p
      className={`text-base text-[7.5px] w-fit mt-2 border px-2 rounded-full ml-8 ${post_type}`}
    >
      {post_type}
    </p>
  );
};
