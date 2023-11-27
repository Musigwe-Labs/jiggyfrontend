import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FiFacebook, FiTwitter } from "react-icons/fi";

const Socialmedialinks = ({ postId, content }) => {
  let url = "https://jiggy-app.netlify.app/comment/" + postId;
  console.log(postId);
  return (
    <div className="flex gap-4 justify-center">
      <a href={`https://www.facebook.com/sharer.php?u=${url}`}>
        <FiFacebook />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${content}`}
      >
        <FiTwitter />
      </a>
      <a>
        <BsWhatsapp />
      </a>
    </div>
  );
};

export default Socialmedialinks;
