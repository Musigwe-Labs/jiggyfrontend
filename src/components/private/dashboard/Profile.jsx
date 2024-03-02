/* eslint-disable react/prop-types */
import { useContext, memo } from "react"
import { FaArrowLeftLong } from 'react-icons/fa6'
import { AuthContext } from "../../../contexts/AuthContext"
import { Link } from "react-router-dom"
import {HiOutlineLogout} from "react-icons/hi"
import PrivacyHeader from "../common/PrivacyHeader"
//add two div side by side the secondone transparent on key press,chande profile state
  const Profile = ({ setProfilePage, profilePage }) => {
  const { logout, userDetails } = useContext(AuthContext)

  function handleClick(e){
    e.stopPropagation()
    setProfilePage(false)
  }
  return (
    <div className={`fixed top-0 ${profilePage? 'left-0' : 'left-[-1000px]'} z-50 flex w-[100%] bg-[rgba(20,20,20,.3)] transition-[left] duration-500`}>
      <div className="shadow-[0_0_5px_0px] shadow-[rgba(150,150,105,.4)] flex flex-col justify-between h-screen h-[100svh] pt-6 pb-6 w-3/4 bg-black ">
        <div>
            <button className='ml-3' onClick={handleClick}>
              <FaArrowLeftLong size={25} className="cursor-pointer" />
          </button>
          <header className="flex flex-col font-bold items-center">
            <h2 className="text-3xl font-['Playfair_Display',_serif] ml-6 font-bold from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66] bg-gradient-to-r bg-clip-text text-transparent">
              <span className="font-['Over_the_Rainbow',_cursive] font-extrbold text-[2.2rem]">
                J
              </span>
              iggy
            </h2>
            <PrivacyHeader generated_username={userDetails?.user?.generated_username} />
          </header>
          <section className="flex gap-3 flex-col px-4">
            <Link
              to="/feedback"
              className="flex gap-2 items-center border-b py-2 px-3"
            >
              <p className="text-[#907378]">Feedback</p>
              <span className="text-[1rem]">🗨️</span>
            </Link>
            <Link
              to="/whatsnew"
              className="text-[#907378] flex gap-2 items-center border-b py-2 px-3"
            >
              <p>What's New</p>
              <div className="flex flex-col items-center">
                <div className="flex items-baseline">
                  <span>⭐</span>
                  <span className="text-[.6rem] ml-[-.3rem]">⭐</span>
                </div>
                <span className="text-[.4rem] mt-[-.2rem]">⭐</span>
              </div>
            </Link>
          </section>
        </div>
        <div className="w-full grid place-items-center">
          <button
            className="flex items-center  py-1 px-2 text-black rounded-lg"
            onClick={() => logout()}
          >
            <p className="text-base mr-2 text-white font-bold">LOG OUT</p>
            <HiOutlineLogout size={20} color="white" />
          </button>
        </div>
      </div>
      <div className="h-100% w-1/4 bg-black opacity-60"
        onClick={handleClick}
        onMouseDown={handleClick}
        onTouchStart={handleClick}
      ></div>
    </div>
  )
}
export default memo(Profile)