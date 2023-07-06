import React from 'react'
import Logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom'

const PubLinks = () => {
    return (
        <div className='w-full flex justify-center md:justify-between items-center px-12 py-6 md:py-3 m-0'> 
            <div className={`flex md:hidden space-x-3 items-center`}>
                <img src={Logo} alt='Logo' />
                <span className='text-2xl font-medium text-gray-300'>JIGGY</span>
            </div>
            <div className='hidden space-x-12'>
                <Link to='/' className='cursor-pointer text-gray-400 hover:text-green-400'>Home</Link>
                <Link to='/login' className='cursor-pointer text-gray-400 hover:text-green-400'>Sign In</Link>
            </div>
        </div>
    )
}

export default PubLinks