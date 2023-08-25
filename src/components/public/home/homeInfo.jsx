import { AiOutlineMore } from "react-icons/ai";
import profile_pic from '../../../assets/profile_pics/pic1.png'
import timeGap from "../../../services/dateCheck";

const HomeInfo = (props) => {
  return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img className='w-6 rounded-3xl mr-3' src={profile_pic} alt='profile-img' />
              <h4 className='text-white mr-2 text-base font-bold'>{props.name}</h4>
              <span className='border border-gray-400'></span>
              <p className='px-1 text-sm text-gray-400'>{ (props.school) === null ? 'ballers' : props.school.school_acronym }</p>
              <span className='border border-gray-400'></span>
              <span className='text-sm text-gray-400 ml-2'>{timeGap(props.created_at)}</span>
            </div>
            <AiOutlineMore className='cursor-pointer'/>
        </div>
  )
}

export default HomeInfo 