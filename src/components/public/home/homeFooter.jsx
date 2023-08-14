import { Link } from 'react-router-dom'
import { AiFillHome, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { RxEnvelopeClosed } from "react-icons/rx";
import { HiOutlineBell } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md"
import { useNavigate } from 'react-router-dom'

const HomeFooter = ()=>{

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('login');
        navigate('/');
        window.location.reload();
    }

    return (
        <div className='w-full flex justify-center fixed bottom-0 bg-[#0c0c0c] space-x-12 p-4'>
            <Link to='/dashboard' className='cursor-pointer text-gray-400 hover:text-green-400'>
                <MdOutlineDashboard size={20} />
            </Link>
            <Link to='/home' className='cursor-pointer text-gray-400 hover:text-green-400'>
                <AiFillHome size={20} />
            </Link>
            <Link to='/messages' className='cursor-pointer text-gray-400 hover:text-green-400'>
                <RxEnvelopeClosed size={20} />
            </Link>
            <Link to='/profile' className='cursor-pointer text-gray-400 hover:text-green-400'>
                <AiOutlineUser size={20} />
            </Link>
            <span className='cursor-pointer text-gray-400 hover:text-green-400'>
                <HiOutlineBell size={20} />
            </span>
            <span onClick={() => logout()} className='cursor-pointer text-red-600 hover:text-red-800'>
                <AiOutlineLogout size={20} />
            </span>
        </div>
    )

}

export default HomeFooter