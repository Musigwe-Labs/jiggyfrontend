import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { userInfo } from '../../../apis/authenticationApis';
import profile_pic from '../../../assets/profile_pics/pic1.png'

const PrivacyHeader = () => {

    const { key } = useContext(AuthContext);
    const [userinfo, setUserinfo] = useState(null);

    useEffect(() => {
        userInfo(key, setUserinfo);
    }, [])

    return (
        <section className='flex flex-col items-center mt-4'>
            <div className='h-[180px] w-[180px] rounded-full border-none'>
                <img src={profile_pic} alt="" className='h-[100%] w=[100%]'/>
            </div>
            {console.log('userinfo is',userinfo)}
            <h3 className='capitalize text-white text-2xl mt-2'>userinfo?.username</h3>
        </section>
    )
}

export default PrivacyHeader