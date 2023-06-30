import React from 'react'
import Logo from '../../assets/logo.png'

const Banner = () => {
    return (
        <div className='hidden md:block md:px-6 lg:px-12 border-r border-gray-900'>
            <img src={Logo} alt='logo' className='w-[70px] mt-16' />
            <h1 className='md:text-5xl lg:text-7xl text-gray-400 my-6'>JIGGY APP</h1>
            <div className='space-y-4 text-gray-500'>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione illum, facilis possimus corrupti eveniet ullam nam fugit optio tempore recusandae repellat fugiat deleniti libero excepturi illo natus ipsa, unde dolorem?
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi adipisci a beatae expedita error magni explicabo tempore eaque veniam amet, officia quas totam accusantium temporibus vitae! Nulla, accusantium harum? Quisquam.
                </div>
            </div>
            <button className='my-8 px-12 py-3 rounded-full bg-transparent border border-[#007aff] text-white hover:bg-[#007aff]'>
                Get Started
            </button>
        </div>
    )
}

export default Banner
