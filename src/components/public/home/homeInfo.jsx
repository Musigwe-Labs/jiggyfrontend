import { AiOutlineMore } from "react-icons/ai";
import profile_pic from '../../../assets/profile_pics/pic1.png'

const HomeInfo = ({ post }) => {
  return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img className='w-6 rounded-3xl mr-3' src={profile_pic} alt='profile-img' />
              <h4 className='text-white mr-2 text-base font-bold'>Emmanuel</h4>
              <span className='border border-gray-400'></span>
              <p className='px-1 text-sm text-gray-400'>FUTO</p>
              <span className='border border-gray-400'></span>
              <span className='text-sm text-gray-400 ml-2'>{'17h'}</span>
            </div>
            <AiOutlineMore className='cursor-pointer'/>
        </div>
  )
}

export default HomeInfo 