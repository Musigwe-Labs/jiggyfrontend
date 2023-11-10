/* eslint-disable react/prop-types */
import {
  LiaCheckSolid,
  LiaGlobeSolid,
  LiaSchoolSolid,
  LiaTimesCircleSolid,
} from "react-icons/lia";
import axios from "../../../services/axios";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import _, { forIn } from "lodash";
import { BsCaretDownFill, BsImages, BsThreeDots } from "react-icons/bs";
import Spinner from "../../common/Spinner";
import { FaSpinner } from "react-icons/fa6";

const CreatePostPage = ({
  setCreatePost,
  reloadPosts,
  isLoading,
  setIsLoading,
  setSelectedPost,
  selectedPostIndex,
  posts
}) => {
  const [content, setContent] = useState("");
  const [post_type, setSelectedOption] = useState("Others");
  const [targeted_school, setTargetedSchool] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [previewImgSrcs, setPreviewImgSrcs] = useState();
  const [imageSrc, setImageSrc] = useState([]);
  const postBtn = useRef();
  const form = useRef();
  const handleTextareaChange = (e) => {
    setContent(e.target.value);
  };

  const handleBtnClick = (e, option) => {
    e.preventDefault();
    setSelectedOption(option);
  };

  const { key } = useContext(AuthContext);
  const headers = {
    Authorization: `Token ${key}`,
    "Content-Type": "multipart/form-data",
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (content) {
      setIsLoading(true);
      const formData = new FormData(form.current, postBtn.current);
      formData.append("content", content);
      formData.append("post_type", post_type);
      imageSrc[0] && formData.append("images", imageSrc[0]);
      try {
        await axios.post("annon/posts/create/", formData, { headers });
        await reloadPosts();
        setSelectedPost(posts[selectedPostIndex])
        setIsLoading(false);
        setCreatePost(false);
      } catch (error) {
        setIsLoading(false);

        console.log(error);
      }
    } else {
    }
  };
  useEffect(() => {
    window.onclick = (e) => {
      !e.target.classList.contains("school_btn") &&
        openDropdown &&
        setOpenDropdown(false);
    };
  });
  const handlePreviewImg = (e) => {
    const files = e.target.files;
    let maxAllowedSize = 3 * 1024 * 1024;
    if (files[0].size < maxAllowedSize) {
      setImageSrc([files[0]]);
      setPreviewImgSrcs(URL.createObjectURL(files[0]));
    } else {
      alert("image is too large");
    }
  };
  const handleRemoveImage = () => {
    setPreviewImgSrcs("");
    setImageSrc("");
  };

  // const handlePost= ()=>{
  //     const data = { content , post_type }
  //     if (socket && socket.readyState === WebSocket.OPEN) {
  //         socket.send(data)
  //         // .then((response)=>console.log(response))
  //         // .catch((err)=>console.log(err))
  //         setCreatePost(false)
  //     }
  // }
  const throttledApiRequest = _.throttle(handlePost, 3500);

  return (
    <form
      ref={form}
      onSubmit={throttledApiRequest}
      className="fixed top-0 z-50 flex py-8 flex-col h-screen w-full bg-[#000]"
    >
      <div>
        <div className="flex justify-between px-5  pb-2 border-b align-center">
          <LiaTimesCircleSolid
            size="25"
            color="#F33F5E"
            cursor="pointer"
            onClick={() => {
              setCreatePost(false);
            }}
          />
          <p className="font-bold">Create an anonymous post</p>
          <button
            className={`text-[#F33F5E] text-lg ${!isLoading && 'bg-white'} font-bold transition-all duration-300 px-3 rounded-lg ${
              !content
                ? "opacity-50"
                : "opacity-1 hover:bg-[#F33F5E] hover:text-white"
            }`}
            onSubmit={throttledApiRequest}
            type="submit"
            ref={postBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner size={"1.5rem"} className="animate-spin" />
            ) : (
              "Post"
            )}
          </button>
        </div>
        <div>
          <button
            name="post_type"
            className={`${post_type} rounded-full px-2 mx-3 mt-3 mb-1`}
          >
            {post_type}
          </button>
          <div className="inline-block">
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex school_btn items-center gap-4 rounded-2xl border-[2px] px-2 "
              >
                <span className="font-semibold text-lg school_btn">
                  {targeted_school}
                </span>
                <span className="school_btn">
                  <BsCaretDownFill className="school_btn" />
                </span>
              </button>
              <div
                className={`shadow-[0_0_3px_0px_#fff] rounded-lg mt-2 absolute w-[13rem] z-10 bg-[#321616] ${
                  openDropdown ? "block" : "hidden"
                }`}
              >
                <h5 className="font-bold text-lg mb-2 px-4 pt-4">
                  Choose audience
                </h5>
                <button
                  onClick={() => setTargetedSchool("All")}
                  className="flex w-full text-lg py-2 px-4 transition duration-300 gap-4 my-1 items-center hover:bg-[#ffffff32]"
                >
                  <span>
                    <LiaGlobeSolid />
                  </span>
                  <span className="font-semibold">All</span>
                  {targeted_school === "All" && (
                    <span className="ml-auto font-semibold">
                      <LiaCheckSolid />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setTargetedSchool("FUTO")}
                  className="flex w-full text-lg py-2 px-4 transition duration-300 gap-4 my-1 items-center hover:bg-[#ffffff32]"
                >
                  <span>
                    <LiaSchoolSolid />
                  </span>
                  <span className="font-semibold">FUTO</span>
                  {targeted_school === "FUTO" && (
                    <span className="ml-auto font-semibold">
                      <LiaCheckSolid />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <textarea
        name="content"
        value={content}
        onChange={handleTextareaChange}
        placeholder="Secret crush ? Confession ? Share ? what's on your mind...."
        className="focus:outline-none text-[20px] max-h-3/5 post-placeholder"
      ></textarea>
      <footer className="mt-auto h-auto">
        <div className="px-5">
          <output className="flex gap-2">
            {previewImgSrcs && (
              <figure
                style={{ backgroundImage: `url(${previewImgSrcs})` }}
                className={` transition-all duration-300 ease-linear aspect-[12/16] bg-cover bg-center rounded-lg w-[5rem] h-[7rem] relative`}
              >
                <LiaTimesCircleSolid
                  onClick={() => handleRemoveImage()}
                  className="absolute cursor-pointer hover:text-lg transition-all duration-300 ease-linear bg-[#321616] rounded-full top-1 right-1"
                />
              </figure>
            )}
          </output>
        </div>

        <div className="px-3">
          <button
            className="Confession rounded-full px-2 m-2"
            onClick={(e) => handleBtnClick(e, "Confession")}
          >
            Confession
          </button>
          <button
            className="Question rounded-full px-2 m-2"
            onClick={(e) => handleBtnClick(e, "Question")}
          >
            Question
          </button>
          <button
            className="Crush rounded-full px-2 m-2"
            onClick={(e) => handleBtnClick(e, "Crush")}
          >
            Crush
          </button>
          <button
            className="DM rounded-full px-2 m-2"
            onClick={(e) => handleBtnClick(e, "DM")}
          >
            DM
          </button>
          <button
            className="Advice rounded-full px-2 m-2"
            onClick={(e) => handleBtnClick(e, "Advice")}
          >
            Advice
          </button>
          <button
            className="Cruise rounded-full px-2 m-2"
            onClick={(e) => handleBtnClick(e, "Cruise")}
          >
            Cruise
          </button>
          <button
            className="Talk rounded-full px-2 m-2"
            onClick={(e) => handleBtnClick(e, "Talk")}
          >
            Talk
          </button>
          <button
            className="Others rounded-full px-2 m-2"
            onClick={(e) => handleBtnClick(e, "Others")}
          >
            Others
          </button>
        </div>
        <div className="px-5 mt-2">
          <label
            className="cursor-pointer  transition-all duration-300 ease-linear"
            htmlFor="imageUpload"
          >
            <BsImages color="#F33F5E" size={"2rem"} />
          </label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="imageUpload"
            name="image"
            multiple={true}
            onChange={(e) => handlePreviewImg(e)}
          />
        </div>
      </footer>
    </form>
  );
};

export default CreatePostPage;
