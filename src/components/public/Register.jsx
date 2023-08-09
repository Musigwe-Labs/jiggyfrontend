import React, { useEffect, useState } from 'react'
import Banner from '../common/Banner'
import { Link, useNavigate } from 'react-router-dom'
import AuthIcons from '../common/AuthIcons'
import TermsOfService from '../common/TermsOfService'
import { registerUser } from '../../apis/authenticationApis'

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirm_password] = useState();
    const [first_name, setFirst_name] = useState();
    const [last_name, setLast_name] = useState();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)

    const [register, setRegister] = useState(false);


    const handleRegister = (e) => {

        e.preventDefault();

        const data = {
            username, first_name, last_name, email, password
        }

        if (password !== confirm_password ) {alert('Password mismatch')}
        else {
            registerUser(data, setSuccess, setError, setRegister);
        };
    }

    if(error !== null) {
        alert(error);
        setError(null);
    }

    useEffect(() => {
        if(success !== null){
            alert(`Sign up Successful! Your new username is ${success.username}`);    
            navigate('/login');
        }
    }, [navigate, success])


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 px-6 lg:px-24 mt-4'>

            <Banner />

            <div className='md:px-6 lg:px-16 md:mt-12'>
                <div className='flex justify-start text-gray-300'>
                    <div className='text-lg py-2 pr-4 border-b-2 border-gray-300'>Sign in</div>
                    <div className='text-lg py-2 border-b-2 border-blue-500'>Sign up</div>
                    <div className='grow border-b-2 border-gray-300'></div>
                </div>

                <div className='my-12'>
                    <form onSubmit={handleRegister} className='space-y-4'>
                        <div>
                            <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Username</div>
                            <input 
                                type='text'
                                className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                                placeholder='first name'
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>First Name</div>
                            <input 
                                type='text'
                                className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                                placeholder='first name'
                                onChange={(e) => setFirst_name(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Last Name</div>
                            <input 
                                type='text'
                                className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                                placeholder='last name'
                                onChange={(e) => setLast_name(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>E-mail</div>
                            <input 
                                type='email'
                                className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                                placeholder='Email/Phone'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Password</div>
                            <input 
                                type='password'
                                className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                                placeholder='Enter password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Confirm Password</div>
                            <input 
                                type='password'
                                className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                                placeholder='Retype your password'
                                onChange={(e) => setConfirm_password(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <button 
                                className='w-full p-3 bg-[#007aff] hover:bg-[#0d4580] rounded-lg text-white mt-6 mb-2'
                            >
                                {register ? 'Joining...' : 'Join Now'}
                            </button>
                        </div>
                    </form>
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
