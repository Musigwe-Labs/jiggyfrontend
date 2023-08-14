import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { userInfo } from '../../../apis/authenticationApis';
import { HiUser } from 'react-icons/hi';

const PrivacyHeader = () => {

    const { key } = useContext(AuthContext);

    const [userinfo, setUserinfo] = useState(null);

    useEffect(() => {
        userInfo(key, setUserinfo);
    }, [key])

    return (
        <section className='flex flex-col items-center'>
            <div className='bg-[rgb(20,20,20)] w-fit text-[3rem] rounded-full px-2 py-2'>
            <HiUser />
            </div>
            <h3 className='capitalize'>{userinfo?.username}</h3>
            <p>
            <a href='#' className='text-[#0E09F0]'>
                {`https://jiggy.com/${userinfo?.username}`}
            </a>
            </p>
        </section>
    )
}

export default PrivacyHeader