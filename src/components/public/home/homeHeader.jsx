import profile_pic from '../../../assets/profile_pics/pic1.png'
import { Link } from 'react-router-dom'

const HomeHeader = () => {
    return (
      <div className='flex items-end pt-6'>
        <Link to='/profile'>
          <img className='w-16 rounded-full mx-3' src={profile_pic} />
        </Link>
        <h1 className='text-white text-4xl'>Home</h1>
      </div>
    )
  }
  
  export default HomeHeader