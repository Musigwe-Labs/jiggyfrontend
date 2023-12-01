import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FiFacebook, FiTwitter } from "react-icons/fi";

const Socialmedialinks = ({ postId, content }) => {
  let url = "https://jiggy-app.netlify.app/comment/" + postId;
  let img = "/src/assets/logo.png";
  return (
    <div className="flex gap-4 mt-4 justify-center">
      <a
        href={`https://www.facebook.com/sharer.php?u=${url}?img=${img}`}
        target="blank"
        rel="noopener noreferrer"
        className="hover:scale-125 transition-all duration-100 ease-linear rounded-full p-2 from-[#ff0000] via-[#ff004c] to-[#0028ad] bg-gradient-to-br"
      >
        <FiFacebook size={"1.5rem"} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${content}`}
        className="hover:scale-125 transition-all duration-100 ease-linear rounded-full p-2 from-[#ff0000] via-[#ff004c] to-[#0028ad] bg-gradient-to-br"
        target="blank"
        rel="noopener noreferrer"
      >
        <FiTwitter size={"1.5rem"} />
      </a>
      <a href={`whatsapp://send?text=${content} \n\n ${url}`}       data-action="share/whatsapp/share"   className="hover:scale-125 transition-all duration-100 ease-linear rounded-full p-2 from-[#ff0000] via-[#ff004c] to-[#0028ad] bg-gradient-to-br">
        <BsWhatsapp size={"1.5rem"} />
      </a>
    </div>
  );
};

export default Socialmedialinks;
