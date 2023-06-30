import React from 'react'
import Banner from '../common/Banner'
import { Link } from 'react-router-dom'
import AuthIcons from '../common/AuthIcons'
import TermsOfService from '../common/TermsOfService'

const Register = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 px-10 lg:px-24 mt-4'>

            <Banner />

            <div className='md:px-6 lg:px-16 md:mt-12'>
                <div className='flex justify-start text-gray-300'>
                    <div className='text-lg py-2 pr-4 border-b-2 border-gray-300'>Sign in</div>
                    <div className='text-lg py-2 border-b-2 border-blue-500'>Sign up</div>
                    <div className='grow border-b-2 border-gray-300'></div>
                </div>

                <div className='my-12 space-y-6'>
                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Your Full Name</div>
                        <input 
                            type='text'
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='your name'
                        />
                    </div>

                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>E-mail/Phone</div>
                        <input 
                            type='text'
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Email/Phone'
                        />
                    </div>

                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Password</div>
                        <input 
                            type='password'
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Enter password'
                        />
                    </div>

                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Confirm Password</div>
                        <input 
                            type='password'
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Retype your password'
                        />
                    </div>

                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Enter university</div>
                        <input 
                            type='text'
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Type university'
                        />
                    </div>

                    <div>
                        <button 
                            className='w-full p-3 bg-[#007aff] rounded-lg text-white mb-2'
                        >
                            Join Now
                        </button>
                    </div>
                    
                </div>

                <div className='flex justify-between text-gray-300 space-x-4 items-center'>
                    <div className='grow border border-gray-500 h-0'></div>
                    <div>Or sign up with</div>
                    <div className='grow border border-gray-500 h-0'></div>
                </div>

                <AuthIcons />

                <div className='flex justify-center text-gray-400 space-x-1 my-10'>
                    <span>Have an Account?</span> <Link to='/login' className='text-[#007aff]'>Sign in</Link>
                </div>

                <TermsOfService />
            </div>
        </div>
    )
}

export default Register
