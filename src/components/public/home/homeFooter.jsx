import { Link } from 'react-router-dom'
import { AiFillHome, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { RxEnvelopeClosed } from "react-icons/rx";
import { HiOutlineBell } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md"
import { useNavigate, useLocation } from 'react-router-dom'

const HomeFooter = ()=>{
    const location = useLocation();

    const urlpath = location.pathname;

    const navlinks = [
        {
            id: 0,
            url: "/home",
            icon: <AiFillHome size={35} />,
        },
        {
            id: 1,
            url: "/messages",
            icon: <RxEnvelopeClosed size={35} />,
        },
        {
            id: 2,
            url: "/notifications",
            icon: <HiOutlineBell size={35} />,
        },
    ]

    return (
        <div className='w-full flex z-10 justify-evenly fixed bottom-0 border-t border-y-[#4B5563] bg-black py-3'>
            {
                navlinks.map(nav => {
                    return(
                        <Link 
                            to={nav.url} 
                            key={nav.id} 
                            className={`cursor-pointer ${urlpath === nav.url ? 'text-[#f33f5e]' : 'text-gray-400'} hover:text-[#f33f5e]`}
                        >
                            {nav.icon}
                        </Link>
                    )
                })
            }
        </div>
    )

}

export default HomeFooter