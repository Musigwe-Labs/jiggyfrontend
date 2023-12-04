import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { AiFillHome as HomeIcon }                 from "react-icons/ai";
import {FaRegBell as BellIcon}   from  'react-icons/fa'
import {BsEnvelope as MessageIcon}               from 'react-icons/bs'


const HomeFooter = ()=>{
    const location = useLocation();
    const urlpath = location.pathname;
    const [clickedIcon, setCliCkedIcon]= useState(null)

     
    const navlinks = [
        {
            id: 0,
            url: "/home",
            icon: <HomeIcon size={20} />,
        },
        {
            id: 1,
            url: "/messages",
            icon: <MessageIcon size={20} />,
        },
        {
            id: 2,
            url: "/notifications",
            icon: <BellIcon size={20} />,
        }
    ]

    //my styles
    // // ]
    //     const navlinks = [
    //     {
    //         id: 0,
    //         url: "/home",
    //         icon: HomeIcon
    //     },
    //     {
    //         id: 1,
    //         url: "/messages",
    //         icon: Envelope
    //     },
    //     {
    //         id: 2,
    //         url: "/notifications",
    //         icon: BellIcon
    //     }
    // ]

    function handleClick(){
        // setIcon
    }

    return (
            <div className='w-full flex z-10 items-center  justify-between  bottom-0 border-t border-y-[#4B5563] bg-black py-3 px-2 fixed h-20 gap-8'>
                {
                 navlinks.map(nav => {
                    return(
                            <NavLink
                                to={nav.url} 
                                key={nav.id} 
                                className={({isActive})=>isActive? (` cursor-pointer ${urlpath === nav.url ? 'text-[#f33f5e]' : 'text-gray-400'} hover:text-[#f33f5e]  w-12 h-10 flex justify-center items-center border-b-[2px] grow`) : (`cursor-pointer ${urlpath === nav.url ? 'text-[#f33f5e]' : 'text-gray-400'} hover:text-[#f33f5e]  w-12 h-10 flex justify-center items-center border-b-[2px] border-black grow`) 
                                }
                                onClick={handleClick}
                            
                        >
                            {nav.icon}
                            
                         </NavLink>
                     )
                 })
                }
                {/*<Bell />*/}
            </div> 

        // <div className='w-full flex z-10 justify-evenly fixed bottom-0 border-t border-y-[#4B5563] bg-black py-3 '>
        //     {
        //         navlinks.map(nav => {
        //             return(
        //                 <Link 
        //                     to={nav.url} 
        //                     key={nav.id} 
        //                     className={`cursor-pointer ${urlpath === nav.url ? 'text-[#f33f5e]' : 'text-gray-400'} hover:text-[#f33f5e]`}
        //                 >
        //                     {nav.icon}
        //                 </Link>
        //             )
        //         })
        //     }


        // // </div>
        // <div>
        //     <img  src={HomeIcon} />


        // </div>
    )

}

export default HomeFooter