/* eslint-disable react/prop-types */
import {
  LiaTimesSolid,
  LiaCheckSolid,
  LiaImageSolid,
  LiaImage,
  LiaGlobeSolid,
  LiaCaretDownSolid,
  LiaCaretSquareDown,
  LiaSchoolSolid,
  LiaTimesCircleSolid,
} from "react-icons/lia";
import axios from "../../../services/axios";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import _, { forIn } from "lodash";
import { BsCaretDown, BsCaretDownFill, BsImages } from "react-icons/bs";

const CreatePostPage = ({ setCreatePost }) => {
  const [content, setContent] = useState("");
  const [post_type, setSelectedOption] = useState("Others");
  const [targeted_school, setTargetedSchool] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [previewImgSrcs, setPreviewImgSrcs] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);
  const postBtn = useRef();
  const form = useRef();
  const handleTextareaChange = (e) => {
    setContent(e.target.value);
  };

  const handleBtnClick = (option) => {
    setSelectedOption(option);
  };

  const { key } = useContext(AuthContext);
  const headers = {
    Authorization: `Token ${key}`,
    "Content-Type": "multipart/form-data",
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current, postBtn.current);
    formData.append("content", content);
    formData.append("post_type", post_type);
    formData.append("images", imageSrc[0]);
   
    try {
      await axios.post("annon/posts/create/", formData, { headers });
      setCreatePost(false);
    } catch (error) {
      console.log(error);
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
    setImageSrc([e.target.files[0]]);

    for (const file in files) {
      if (Object.hasOwnProperty.call(files, file)) {
        if (files[file]) {
          setPreviewImgSrcs([
            ...previewImgSrcs,
            URL.createObjectURL(files[file]),
          ]);
        }
      }
    }
  };
  const handleRemoveImage = (index) => {
    setPreviewImgSrcs(
      previewImgSrcs.filter((imgSrcs, imgIndex) => imgIndex !== index)
    );
    setImageSrc(imageSrc.filter((imgSrcs, imgIndex) => imgIndex !== index));
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
          className="text-[#F33F5E] text-lg"
          onSubmit={throttledApiRequest}
          type="submit"
          ref={postBtn}
        >
          Post
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
      <textarea
        name="content"
        value={content}
        onChange={handleTextareaChange}
        placeholder="Secret crush ? Confession ? Share ? what's on your mind...."
        className="focus:outline-none text-[20px] post-placeholder"
      ></textarea>
      <footer className="mt-auto">
        <div className="px-5">
          <output className="flex gap-2">
            {previewImgSrcs.map((imgSrc, index) => (
              <figure
                key={index}
                style={{ backgroundImage: `url(${imgSrc})` }}
                className={` transition-all duration-300 ease-linear aspect-[9/16] bg-cover bg-center rounded-lg w-[5rem] h-[7rem] relative`}
              >
                <LiaTimesCircleSolid
                  onClick={() => handleRemoveImage(index)}
                  className="absolute cursor-pointer hover:text-lg transition-all duration-300 ease-linear bg-[#321616] rounded-full top-1 right-1"
                />
              </figure>
            ))}
          </output>
        </div>

        <div className="px-3">
          <button
            className="Confession rounded-full px-2 m-2"
            onClick={() => handleBtnClick("Confession")}
          >
            Confession
          </button>
          <button
            className="Question rounded-full px-2 m-2"
            onClick={() => handleBtnClick("Question")}
          >
            Question
          </button>
          <button
            className="Crush rounded-full px-2 m-2"
            onClick={() => handleBtnClick("Crush")}
          >
            Crush
          </button>
          <button
            className="DM rounded-full px-2 m-2"
            onClick={() => handleBtnClick("DM")}
          >
            DM
          </button>
          <button
            className="Advice rounded-full px-2 m-2"
            onClick={() => handleBtnClick("Advice")}
          >
            Advice
          </button>
          <button
            className="Cruise rounded-full px-2 m-2"
            onClick={() => handleBtnClick("Cruise")}
          >
            Cruise
          </button>
          <button
            className="Talk rounded-full px-2 m-2"
            onClick={() => handleBtnClick("Talk")}
          >
            Talk
          </button>
          <button
            className="Others rounded-full px-2 m-2"
            onClick={() => handleBtnClick("Others")}
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
