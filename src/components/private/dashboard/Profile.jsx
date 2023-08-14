import { Link } from 'react-router-dom'
// import { BsArrowLeft, BsListTask, BsViewList } from "react-icons/bs"
import { HiArrowLeft, HiChevronRight, HiCog, HiEye, HiLockClosed, HiOutlinePencilAlt, HiUser } from 'react-icons/hi'

export const Profile = () => {
  return (
    <div className='px-[1.5rem]'>
      <header className='flex gap-4 font-bold items-center py-[1.8rem]'>
        <Link to='/home'>
          <button className='text-white font-bolder text-[1.5rem] mt-1'>
            <HiArrowLeft />
          </button>
        </Link>
        <h2 className="text-[1.5rem] font-['Open Sans', sans-serif]">Profile</h2>
      </header>
      <main>
        <section className='flex flex-col items-center'>
          <div className='bg-[rgb(20,20,20)] w-fit text-[3rem] rounded-full px-2 py-2'>
            <HiUser />
          </div>
          <h3 className='capitalize'>Sircumsalot</h3>
          <p>
            <a href='#' className='text-[#0E09F0]'>
              https://jiggy.com/anonymous
            </a>
          </p>
        </section>
        <section className='flex gap-3 flex-col my-8'>
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
          <a href="/privacy" className="flex gap-2 items-center bg-[#261616] py-2 px-3">
            <i className="mt-1"><HiLockClosed /></i>
            <p>Privacy</p>
            <i className="text-[#BB9292] ml-auto text-[1.5rem]"><HiChevronRight /></i>
          </a>
          <a href="#" className="flex gap-2 items-center bg-[#261616] py-2 px-3">
            <i className="mt-1"><HiCog /></i>
            <p>Setting</p>
            <i className="text-[#BB9292] ml-auto text-[1.5rem]"><HiChevronRight /></i>
          </a>
        </section>
      </main>
    </div>
  );
};
