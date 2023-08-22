import profile_pic from '../../../assets/profile_pics/pic1.png'

const PrivacyHeader = () => {

    return (
        <section className='flex flex-col items-center mt-3'>
            <div className='h-[120px] w-[120px] rounded-full border-none'>
                <img src={profile_pic} alt="" className='h-[100%] w=[100%]'/>
            </div>
        </section>
    )
}

export default PrivacyHeader