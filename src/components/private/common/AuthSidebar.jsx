import React from 'react'
import { HiUser } from 'react-icons/hi'

const AuthSidebar = () => {
    return (
        <div className='hidden md:block col-span-1 border-r border-gray-900 p-4'>
            <div className='w-full flex justify-center items-center'>
                <div className='max-w-max p-2 rounded-full bg-white mt-8'><HiUser size={35} /></div>
            </div>
        </div>
    )
}

export default AuthSidebar