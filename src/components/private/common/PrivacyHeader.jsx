import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { userInfo } from '../../../apis/authenticationApis'
import profile_pic from '../../../assets/profile_pics/pic1.png'

const PrivacyHeader = () => {

    const { key } = useContext(AuthContext);
    const [userinfo, setUserinfo] = useState(null);

    useEffect(() => {
        userInfo(key, setUserinfo);
    }, [key])

    return (
        <section className='flex flex-col items-center mt-3'>
            <div className='h-[120px] w-[120px] rounded-full border-none'>
                <img src={profile_pic} alt="" className='h-[100%] w=[100%]'/>
            </div>
            <h3 className='text-white text-sm my-3'>{ userinfo.email }</h3>
        </section>
    )
}

export default PrivacyHeader