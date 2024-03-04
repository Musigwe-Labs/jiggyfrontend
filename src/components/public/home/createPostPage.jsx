/* eslint-disable react/prop-types */
import {
  LiaCheckSolid,
  LiaGlobeSolid,
  LiaSchoolSolid,
  LiaTimesCircleSolid,
} from "react-icons/lia"
import axios from "../../../services/axios"
import { useState, useEffect, useRef, useMemo , memo } from "react"
import { useAuthContext } from "../../../contexts/AuthContext"
import _ from "lodash"
import { BsCaretUpFill , BsCaretDownFill, BsImages } from "react-icons/bs"
import { FaArrowRotateRight, FaSpinner } from "react-icons/fa6"
import { useErrorContext } from "../../../contexts/ErrorContext"
import Tick from "../../../assets/Tick.svg"
import { useQuery } from "@tanstack/react-query"
import { getSchoolList } from "../../../utils/user"
import SaveDraft from './SaveDraft'
const CreatePostPage = ({createPost, setCreatePost, reloadPosts, userSchool }) => {
  const [content, setContent] = useState(()=> localStorage.getItem('draft') || '')
  const [status, setStatus] = useState('resolved')
  const [post_type, setSelectedOption] = useState("Others")
  const [targeted_school, setTargetedSchool] = useState("ALL")
  const [code, setCode] = useState(0)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [previewImgSrcs, setPreviewImgSrcs] = useState()
  const [imageSrc, setImageSrc] = useState([])
  const postBtn = useRef()
  const [error, setError] = useState("")
  const form = useRef()
  const { setAppError } = useErrorContext()
  const { key } = useAuthContext()
  
  const handleTextareaChange = (e) => {
    setContent(e.target.value)
  }
  const handleBtnClick = (e, option) => {
    e.preventDefault()
    setSelectedOption(option)
  }
  const headers = {
    Authorization: `Token ${key}`,
    "Content-Type": "multipart/form-data",
  }
  const { isPending, data: schoolListResult, error: hasError } = useQuery({
    queryKey: ["schoolList", 1, key],
    queryFn: getSchoolList,
  })
  const schoolList = useMemo(
    () =>
      schoolListResult ? [...schoolListResult?.data?.results] : schoolListResult,
      [schoolListResult]
  )
  const schoolCode = (school) => {
    if (school.toLowerCase() === "all") {
      setCode(0);
      return
    }
    let schoolIndex = schoolList.findIndex(
      (school) => school?.school_acronym === userSchool?.school_acronym
    )
    setCode(schoolIndex + 1)
  }
  function handleClose(){
    if(content){
      setStatus('draft-created')
    }else{
      setStatus('resolved')
      setCreatePost(false)
    }
  }
  const handlePost = async () => {
    if (content) {
      setStatus('loading')
      const formData = new FormData(form.current, postBtn.current)
      formData.append("post_type", post_type)
      formData.append("images", imageSrc[0] ? imageSrc[0] : "")
      formData.append("school", code ? code : "")
      try {
        await axios.post("annon/posts/create/", formData, { headers })
        await reloadPosts()
        setContent('')
        setStatus('resolved')
        setCreatePost(false)
        setAppError({message:"You've created a new post", status:'success'})
      } catch (error) {
        if (error) {
          setStatus({error:error})
          console.log(error.message)
          if (error.message == "Network Error") {
            setAppError(error)
          }
          if (error.code === "ERR_BAD_RESPONSE") {
            setError("server error")
          }
        }
      }
    }
  }
  useEffect(() => {
    window.onclick = (e) => {
      !e.target.classList.contains("school_btn") &&
        openDropdown &&
        setOpenDropdown(false)
    } 
  })
  useEffect(()=>{
    if( status=='draft-created' ) setStatus('resolved')
  }, [content])
  const handlePreviewImg = (e) => {
    const files = e.target.files
    let maxAllowedSize = 3 * 1024 * 1024
    if (files[0].size < maxAllowedSize) {
      setImageSrc([files[0]])
      setPreviewImgSrcs(URL.createObjectURL(files[0]))
    } else {
      alert("image is too large")
    }
  }
  const handleRemoveImage = () => {
    setPreviewImgSrcs("")
    setImageSrc("")
  }
  function reset() {
    setAppError(null)
    setError(null)
  }
  const throttledApiRequest = _.throttle(handlePost, 3500)
  if (error === "server error") {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="text-center">
          <p>Ooops, Server Error</p>
          <a
            href="#"
            className="text-blue-500 flex items-center gap-2"
            onClick={reset}
          >
            <FaArrowRotateRight />
            Try Again
          </a>
        </div>
      </div>
    )
  }
  return (
     <div className={`fixed top-0 ${ createPost? 'right-0' : 'right-[-2000px]'} z-50 py-8  h-screen h-[100svh] w-full bg-[#000] transition-all duration-500`}>
        <div className={`save-draft wrapper absolute ${status=='draft-created'? "top-0": "top-[-500px]"}  transition-all w-full duration-200`}>
          <SaveDraft content={content} setCreatePost={setCreatePost} setStatus={setStatus} setContent={setContent} />
        </div>
      <form
        ref={form}
        className={` flex flex-col h-full`}
      >
        <div className="pt-8">
          <div className="flex justify-between items-center px-5  pb-2 border-b border-[#9E9898] align-center">
            <LiaTimesCircleSolid
              size="20"
              color="#F33F5E"
              cursor="pointer"
              onClick={handleClose}
    
            />
            <p className="font-bold text-xs  font-openSans">
              Create an anonymous post
            </p>
            <button
              onClick={throttledApiRequest}
              type="submit"
              ref={postBtn}
              disabled={status=='loading' || content=='' || status=='draft-created'}
            >
              {status!= 'loading' &&  <img src={Tick} alt="create post" /> }
              {status =='loading' && <FaSpinner size={"1.5rem"} className="animate-spin" /> } 
            </button>
          </div>
          <div>
            <button
              name="post_type"
              className={`${post_type} rounded-full px-2 mx-3 mt-3 mb-1 text-sm border-[1px]`}
              onClick={(e)=>e.preventDefault()}
            >
              {post_type}
            </button>
            <div className="inline-block">
              <div className="relative">
                <button
                  onClick={
                    (e)=>{
                      e.preventDefault()
                      setOpenDropdown(!openDropdown)
                    }
                  }
                  className="flex school_btn items-center gap-2 rounded-2xl border-[1px] px-2 "
                >
                  <span className="font-semibold text-sm  school_btn">
                    {targeted_school}
                  </span>
                  <span className="school_btn">
                    {openDropdown ? <BsCaretUpFill /> : <BsCaretDownFill />}
                  </span>
                </button>
                <div
                  className={`shadow-[0_0_3px_0px_#fff] rounded-lg mt-2 absolute w-[9rem] z-10 bg-[#321616] ${
                    openDropdown ? "block" : "hidden"
                  }`}
                >
                  <h5 className="font-bold text-sm mb-2 px-2 pt-2">
                    Choose audience
                  </h5>
                  <button
                    onClick={(e)=>{
                      e.preventDefault()
                      schoolCode("ALL")
                      setTargetedSchool("ALL")
                    }}
                    className="flex w-full py-2 px-2 transition duration-300 gap-4 my-1 items-center hover:bg-[#ffffff32]"
                  >
                    <LiaGlobeSolid />
                    <span className="font-semibold text-sm">ALL</span>
                    {code === 0 && (
                      <span className="ml-auto font-semibold">
                        <LiaCheckSolid />
                      </span>
                    )}
                  </button>
                  <button
                    onClick={(e)=>{
                      e.preventDefault()
                      setCode(1)
                      schoolCode(userSchool?.school_acronym)
                      setTargetedSchool(userSchool?.school_acronym)
                    }}
                    className="flex w-full py-2 px-2 transition duration-300 gap-4 my-1 items-center hover:bg-[#ffffff32]"
                  >
                    <LiaSchoolSolid />
                    <span className="font-semibold text-sm">
                      {userSchool?.school_acronym}
                    </span>
                    {code !== 0 && (
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
        <div className="text-input grow">
          <textarea
            name="content"
            value={content}
            spellCheck={false}
            onChange={handleTextareaChange}
            placeholder="Secret crush ? Confession ? Share ? what's on your mind...."
            className="focus:outline-none text-base font-ibmPlexSans post-placeholder placeholder:font-comicSans placeholder:text-base min-h-[150px]"
          ></textarea>
        </div>
        <footer className="">
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

          <div className="px-3 flex gap-1 flex-wrap">
            <button
              className="Confession rounded-full text-xs border-[1px] my-2 px-2 "
              onClick={(e) => handleBtnClick(e, "Confession")}
            >
              Confession
            </button>
            <button
              className="Question rounded-full px-2 text-xs border-[1px] my-2"
              onClick={(e) => handleBtnClick(e, "Question")}
            >
              Question
            </button>
            <button
              className="Crush rounded-full px-2 text-xs border-[1px] my-2"
              onClick={(e) => handleBtnClick(e, "Crush")}
            >
              Crush
            </button>
            <button
              className="DM rounded-full px-2 text-xs border-[1px] my-2"
              onClick={(e) => handleBtnClick(e, "DM")}
            >
              DM
            </button>
            <button
              className="Advice rounded-full px-2 text-xs border-[1px] my-2"
              onClick={(e) => handleBtnClick(e, "Advice")}
            >
              Advice
            </button>
            <button
              className="Cruise rounded-full px-2 text-xs border-[1px] my-2"
              onClick={(e) => handleBtnClick(e, "Cruise")}
            >
              Cruise
            </button>
            <button
              className="Talk rounded-full px-2 text-xs border-[1px] my-2"
              onClick={(e) => handleBtnClick(e, "Talk")}
            >
              Talk
            </button>
            <button
              className="Others rounded-full px-2 text-xs border-[1px] my-2"
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
              multiple={true}
              onChange={(e) => handlePreviewImg(e)}
            />
          </div>
        </footer>
      </form>
     </div>  
  )
}
export default memo(CreatePostPage)