import { Link } from 'react-router-dom'
import { AiFillHome, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { RxEnvelopeClosed } from "react-icons/rx";
import { HiOutlineBell } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md"
import { useNavigate, useLocation } from 'react-router-dom'

const HomeFooter = ()=>{

    const navigate = useNavigate();

    const location = useLocation();

    const urlpath = location.pathname;

    const logout = () => {
        localStorage.removeItem('login');
        navigate('/');
        window.location.reload();
    }


    const navlinks = [
        {
            id: 1,
            url: "/dashboard",
            icon: <MdOutlineDashboard size={20} />,
        },
        {
            id: 2,
            url: "/home",
            icon: <AiFillHome size={20} />,
        },
        {
            id: 3,
            url: "/messages",
            icon: <RxEnvelopeClosed size={20} />,
        },
        {
            id: 4,
            url: "/profile",
            icon: <AiOutlineUser size={20} />,
        },
        {
            id: 5,
            url: "/messages",
            icon: <HiOutlineBell size={20} />,
        },
    ]

    return (
        <div className='w-full flex justify-center fixed bottom-0 bg-gray-900 space-x-10 p-4'>
            {
                navlinks.map(nav => {
                    return(
                        <Link 
                            to={nav.url} 
                            key={nav.id} 
                            className={`cursor-pointer ${urlpath === nav.url ? 'text-green-400' : 'text-gray-400'} hover:text-green-400`}
                        >
                            {nav.icon}
                        </Link>
                    )
                })
            }
            
            <span onClick={() => logout()} className='cursor-pointer text-red-600 hover:text-red-800'>
                <AiOutlineLogout size={20} />
            </span>
        </div>
    )

}

export default HomeFooter