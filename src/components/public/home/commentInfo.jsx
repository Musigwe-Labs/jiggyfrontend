/* eslint-disable react/prop-types */
import { BsThreeDots } from 'react-icons/bs'
import profile_pic from '../../../assets/profile_pics/pic1.png'

const CommentInfo = (props) => {
  return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img className='w-6 rounded-3xl mr-2' src={profile_pic} alt='profile-img' />
              <h4 className='text-white mr-1 text-base font-bold'>{props.name}</h4>
              <p className='px-1 text-sm text-gray-400'>{ (props.school) === null ? 'ballers' : props.school.school_acronym }</p>

            </div>
            <BsThreeDots className='cursor-pointer'/>
        </div>
  )
}

export default CommentInfo 