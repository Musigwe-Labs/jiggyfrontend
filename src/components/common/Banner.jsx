import React from 'react'
import Logo from '../../assets/logo.png'
import img from '../../assets/authentication-img.png'

const Banner = () => {
    return (
        <div className='md:block md:px-6 lg:px-12 border-r border-gray-900 text-center'>
            <img src={Logo} alt='logo' className='w-[30%] pt-4 border-s-fuchsia-400' />
            <h1 className='max-sm:text-4xl md:text-5xl lg:text-7xl text-gray-400 my-6'>JIGGY APP</h1>
            <div className='space-y-4 text-gray-500'>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <img src={img} alt="svg" className='w-1/2 mx-auto pb-4'/>
            </div>
            <div className='flex justify-center'>
            <button className='my-8 px-12 py-3 rounded-full bg-transparent border border-gray-500 text-white hover:bg-[#007aff]'>
                Get Started
            </button>
            </div>
        </div>
    )
}

export default Banner
