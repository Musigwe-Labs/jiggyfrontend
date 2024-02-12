import React, { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import Logo from '../../assets/logo.png'
import img from '../../assets/authentication-img.png'
import { FaArrowAltCircleRight, FaArrowAltCircleDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Banner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const buttonRef = useRef(null)
  const Typewriter = () => {
    const typedElementRef = useRef(null)
    useEffect(() => {
      const options = {
        strings: ["Your campus, Your Secret, Your story", "Get ready to embrace the mystery!"],
        typeSpeed: 50,
        loop: true,
        loopCount: Infinity
      }
      const typed = new Typed(typedElementRef.current, options)
      return () => {
        typed.destroy()
      }
    }, [])
    return <span ref={typedElementRef}></span>;
  }

useEffect(() => {
  // Add an event listener to update the button text on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className='md:block md:px-6 lg:px-12 border-r border-gray-900 text-center'>
      <img src={Logo} alt='logo' className='w-[30%] pt-4 border-s-fuchsia-400' />
      <h1 className='max-sm:text-4xl md:text-5xl lg:text-7xl text-white-400 mt-6 mb-3 from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66] bg-gradient-to-r bg-clip-text text-transparent'>JIGGY</h1>
      <div className='space-y-4 text-gray-500'>
        <Typewriter />
        <img src={img} alt="svg" className='w-1/2 mx-auto pb-4' />
      </div>
      <div className='flex justify-center'>
        <Link to='/register'>
        <button className='my-8 px-12 py-3 cursor-pointer bg-transparent border border-gray-500 text-white flex items-center'>
          Get Started
          {isMobile?(<FaArrowAltCircleDown className='mx-3' />):(<FaArrowAltCircleRight className='mx-3' />)}
        </button></Link>
      </div>
    </div>
  )
}
export default React.memo(Banner)