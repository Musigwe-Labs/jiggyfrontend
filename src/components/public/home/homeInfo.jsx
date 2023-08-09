import { AiOutlineMore } from "react-icons/ai";

const HomeInfo = () => {
  return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img className='w-6 rounded-3xl mr-3' src='anonymous.png' alt='profile-img' />
              <h4 className='text-white mr-2 text-xl'>Emmanuel</h4>
              <span className='border border-gray-600'></span>
              <p className='px-2 text-base'>FUTO</p>
              <span className='border border-gray-600'></span>
              <span className='text-base ml-3'>17h</span>
            </div>
            <AiOutlineMore className='cursor-pointer'/>
        </div>
  )
}

export default HomeInfo