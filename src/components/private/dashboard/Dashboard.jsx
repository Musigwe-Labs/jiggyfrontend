import React, { useContext, useEffect, useState } from 'react'
import AuthSidebar from '../common/AuthSidebar'
import { AiOutlineUser } from 'react-icons/ai'
import { AuthContext } from '../../../contexts/AuthContext'
import { userInfo } from '../../../apis/authenticationApis'

const Dashboard = () => {

    const { key, logout } = useContext(AuthContext);
    const [userinfo, setUserinfo] = useState(null);

    useEffect(() => {
        userInfo(key, setUserinfo);
    }, [key])

    return (
        <div className="grid md:grid-cols-8 pt-16">
            <AuthSidebar />
            <div className='col-span-7 px-4 md:px-12'>
                <div className='flex justify-between items-center text-gray-100 pb-2 mt-4 md:mt-8'>
                    <div className='flex justify-start items-center space-x-3'>
                        <div className='max-w-max rounded-full bg-white text-gray-900'><AiOutlineUser size={30} /></div>
                        <span className='text-2xl font-medium'>Home</span>
                    </div>
                    <span className='text-md'></span>
                </div> 

                <div className='flex justify-between md:justify-start md:space-x-24 pt-2 border-b border-gray-900 px-10'>
                    <span className='text-gray-300 border-b-4 border-blue-500 pb-1 px-3'>
                       {userinfo !== null ? (
                            userinfo === undefined ? logout() : <span className='capitalize'>{userinfo.username}</span>
                       ) : '..........'}
                    </span>
                    <span className='text-gray-300 pb-0'>
                        Trending
                    </span>
                </div>

                <div className='flex justify-between items-center mt-2 pt-2 border-b border-gray-900'>
                    <span className='text-red-600 text-2xl font-medium pb-1'>
                        Chat with stranger !
                    </span>
                    <div className='flex space-x-1 items-center text-xs'>
                        <span className='h-[8px] rounded-lg bg-green-600 p-1'></span>
                        <span className='text-gray-400 p-1'>
                            30,000 user online
                        </span>
                    </div>
                </div>

                <div className='grid md:grid-cols-2'>
                    <div className='col-span-1'>
                        <p className='text-gray-200 mt-2 md:mt-4'>
                        JIGGY is a great way to meet new friends. When you use JIGGY, you are paired randomly with another person to talk one-on-one. If you prefer, you can add your interests and you’ll be randomly paired with someone who selected some of the same interests.
To help you stay safe, chats are anonymous unless you tell someone who you are (not recommended!), and you can stop a chat at any time. See our <span className='underline'>Terms of Service and Community Guidelines</span> for more info about the do’s and don’ts in using JIGGY. JIGGY video chat is moderated but no moderation is perfect. Users are solely responsible for their behavior while using JIGGY.
YOU MUST BE 18 OR OLDER TO USE JIGGY.
                        </p>
                    </div>

                    <div className='col-span-1'>
                        <div className='w-full flex mt-8 justify-center items-center'>
                            <span className='text-xl font-medium text-gray-100'>
                                Start chatting
                            </span>
                        </div>
                        
                        <div className='w-full flex mt-4 justify-center items-center'>
                            <button className='w-[130px] rounded-lg bg-red-700 text-lg text-gray-100 py-1'>Text</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard