import React from 'react'
import Logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom'
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai'
import { RxEnvelopeClosed } from 'react-icons/rx'
import { HiOutlineBell } from 'react-icons/hi'

const AuthLinks = ({ logout }) => {

    return (
         <div className='w-full bg-[#0c0c0c] fixed flex justify-between md:justify-between items-center px-3 md:px-12 py-3 m-0'>
            <div className={`flex space-x-3 items-center`}>
                <img src={Logo} alt='Logo' width='40px' />
                <span className='hidden md:flex text-2xl font-medium text-gray-300'>JIGGY</span>
            </div>
        </div>
    )
}

export default AuthLinks