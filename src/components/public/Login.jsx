import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthIcons from '../common/AuthIcons'
import TermsOfService from '../common/TermsOfService'
import Banner from '../common/Banner'
//import { useLoginUserMutation } from '../../services/authApi'
import { loginUser } from '../../apis/authenticationApis'

const Login = () => {

    const navigate = useNavigate();

    /**const [email, setEmail] = useState();*/
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [signing, setSigning] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    //const [loginUser, {data, isError, error}] = useLoginUserMutation();

    useEffect(() => {
        if(success !== null) {
            localStorage.setItem("login", JSON.stringify({
                key: success.key
            }));

            setError("");
            setUsername("");
            setPassword("");
            navigate('/dashboard');
            window.location.reload();
        }

        if(error !== null){
            alert(error.non_field_errors[0]);
            setSigning(false);
            setError(null);
        }

    }, [success, error]);

    const handleLogin = (e) => {

        e.preventDefault();

        const data = {
            username, password
        }
        
        loginUser(data, setSuccess, setError, setSigning);
    }


    useEffect(() => {
        if(localStorage.getItem('login') !== null){
            navigate('/dashboard');
        }
    }, [navigate])


    return (
        <div className='grid grid-cols-1 md:grid-cols-2 px-6 lg:px-24 mt-4'>

            <Banner />

            <div className='md:px-6 lg:px-16 md:mt-12'>
                <div className='flex justify-start text-gray-300'>
                    <div className='text-lg py-2 border-b-2 border-blue-500'>Sign in</div>
                    <div className='grow border-b-2 border-gray-300'></div>
                </div>

                <div className='my-12'>
                    <form onSubmit={handleLogin} className='space-y-4'>
                        <div>
                            <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Username</div>
                            <input 
                                type='text'
                                className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                                placeholder='Username'
                                onChange={(e) => setUsername(e.target.value)}
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
                            <button 
                                className='w-full p-3 bg-[#007aff] hover:bg-[#0d4580] rounded-lg text-white mt-6 mb-2'
                            >
                                {signing ? 'Logging in...' : 'Login'}
                            </button>
                            
                            <div className='w-full flex justify-end text-md text-gray-300'>
                                <Link to='/login'>Forgot Password?</Link>
                            </div>
                        </div>
                    </form>
                </div>

                <div className='flex justify-between text-gray-300 space-x-4 items-center'>
                    <div className='grow border border-gray-500 h-0'></div>
                    <div>Or signin with</div>
                    <div className='grow border border-gray-500 h-0'></div>
                </div>

                <AuthIcons />

                <div className='flex justify-center text-gray-400 space-x-1 my-10'>
                    <span>Don't have an Account?</span> <Link to='/register' className='text-[#007aff]'>Sign up</Link>
                </div>

                <TermsOfService />
            </div>
        </div>
    )
}

export default Login
