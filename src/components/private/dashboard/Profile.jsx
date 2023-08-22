/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { HiChevronRight, HiCog, HiEye, HiLockClosed, HiOutlinePencilAlt , HiOutlineLogout} from 'react-icons/hi'
import PrivacyHeader from '../common/PrivacyHeader';

//add two div side by side the secondone transparent on key press,chande profile state
export const Profile = ({setProfilePage}) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className='fixed top-0 z-50 flex w-[100%]'>
      <div className='flex flex-col justify-between h-[100vh] pt-6 pb-16 w-3/4 bg-black'>
        <header className='flex flex-col items-center font-bold items-center'>
          <h2 className="text-3xl font-['Open Sans', sans-serif] ml-6 font-bold from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66] bg-gradient-to-r bg-clip-text text-transparent">Jiggy</h2>
          <PrivacyHeader />
        </header>
        <section className='flex gap-3 flex-col px-4'>
          <a href='#' className='flex gap-2 items-center bg-[#261616] py-2 px-3'>
            <i className='mt-1'><HiOutlinePencilAlt /></i>
            <p>Edit Profile</p>
            <i className='text-[#BB9292] ml-auto text-[1.5rem]'><HiChevronRight /></i>
          </a>
          <a href='#' className='flex gap-2 items-center bg-[#261616] py-2 px-3'>
            <i className='mt-1'><HiEye /></i>
            <p>Private</p>
            <i className='text-[#BB9292] ml-auto text-[1.5rem]'><HiChevronRight /></i>
          </a>
          <Link to="/privacy" className="flex gap-2 items-center bg-[#261616] py-2 px-3">
            <i className="mt-1"><HiLockClosed /></i>
            <p>Privacy</p>
            <i className="text-[#BB9292] ml-auto text-[1.5rem]"><HiChevronRight /></i>
          </Link>
          <a href="#" className="flex gap-2 items-center bg-[#261616] py-2 px-3">
            <i className="mt-1"><HiCog /></i>
            <p>Setting</p>
            <i className="text-[#BB9292] ml-auto text-[1.5rem]"><HiChevronRight /></i>
          </a>
        </section>
        <div className='w-full grid place-items-center'>
          <button className='flex items-center  py-1 px-2 text-black rounded-lg bg-[#321616]' onClick={()=>logout()}>
            <HiOutlineLogout  size={25}/>
            <p className='text-xl ml-4 font-bold'>LOG OUT</p>
          </button>
        </div>
      </div>
      <div className='h-100% w-1/4' 
      onClick={()=>setProfilePage(false)}
      onMouseDown={()=>setProfilePage(false)}
      onTouchStart={()=>setProfilePage(false)}
      ></div>
    </div>   
  )
}
