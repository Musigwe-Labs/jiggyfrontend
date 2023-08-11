import { useState } from 'react'
import Banner from '../common/Banner'
import { Link } from 'react-router-dom'
import AuthIcons from '../common/AuthIcons'
import TermsOfService from '../common/TermsOfService'
import axios from 'axios'

const Register = () => {
    const [data, setData] = useState({  username:'', email: '', password:'', first_name: '', last_name:'', school:''})
      
    const handleBlankError = ()=>{
        if(data.username===''){
        document.getElementById('username').innerText = 'Enter a user name'
        }
        if(data.email===''){
        document.getElementById('email').innerText = 'Enter an email'
        }
        if(data.password===''){
        document.getElementById('password').innerText = 'Enter a password'
        }
        if(data.first_name===''){
        document.getElementById('firstname').innerText = 'Enter a first name'
        }
        if(data.last_name===''){
        document.getElementById('lastname').innerText = 'Enter a last name'
        }
        if(data.school===''){
        document.getElementById('school').innerText = 'Enter a university'
        }
    }
    const clearErrorMessage = ()=>{
        document.getElementById('username').innerText = ''
        document.getElementById('email').innerText = ''
        document.getElementById('password').innerText = ''
        document.getElementById('firstname').innerText = ''
        document.getElementById('lastname').innerText = ''
        document.getElementById('school').innerText = ''
    }
    const handleSubmit = async (e) => {
        clearErrorMessage()
        if(data.username==='' ||  data.email==='' || data.password==='' || data.first_name==='' || data.last_name==='' || data.school===''){
            handleBlankError()
        }
        e.preventDefault();
        try {
            const response = await axios.post('https://cruise.pythonanywhere.com/account/registration/annoyuser/', data)
            if(response.statusText == 'Created'){
                window.location.href ='/'
            }
            console.log(response)
        } catch (error) {
            let errorMsg = error.response.data
            if('username' in errorMsg){
                document.getElementById('username').innerText = errorMsg['username']
            }
            if('email' in errorMsg){
                document.getElementById('email').innerText = errorMsg['email']
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setData((prevData) => (
            { ...prevData, [name]: value }
        ))
    }
    
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 px-10 lg:px-24 mt-4'>
            <Banner />
            <div className='md:px-6 lg:px-16 md:mt-12'>
                <div className='flex justify-start text-gray-300'>
                    <div className='text-lg py-2 pr-4 border-b-2 border-gray-300'>Sign in</div>
                    <div className='text-lg py-2 border-b-2 border-blue-500'>Sign up</div>
                    <div className='grow border-b-2 border-gray-300'></div>
                </div>
                <form className='my-12 space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Username</div>
                        <input 
                            type='text'
                            name='username' value={data.username} onChange={handleInputChange}
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Your Username' />
                        <sub className='text-red-500 font-bold' id='username'></sub>
                    </div>
                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>E-mail</div>
                        <input 
                            type='text'
                            name='email' value={data.email} onChange={handleInputChange}
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Email/Phone' />
                        <sub className='text-red-500 font-bold' id='email'></sub>
                    </div>
                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Password</div>
                        <input 
                            type='password'
                            name='password' value={data.password} onChange={handleInputChange}
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Enter Password' />
                        <sub className='text-red-500 font-bold' id='password'></sub>
                    </div>
                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>First Name</div>
                        <input 
                            type='text'
                            name='first_name' value={data.first_name} onChange={handleInputChange}
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Your First Name' />
                        <sub className='text-red-500 font-bold' id='firstname'></sub>
                    </div>
                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Last Name</div>
                        <input 
                            type='text'
                            name='last_name' value={data.last_name} onChange={handleInputChange}
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Your Last Name' />
                        <sub className='text-red-500 font-bold' id='lastname'></sub>
                    </div>
                    <div>
                        <div className='relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max'>Enter university</div>
                        <input 
                            type='text'
                            name='school' value={data.school} onChange={handleInputChange}
                            className='w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700'
                            placeholder='Enter Your University' />
                        <sub className='text-red-500 font-bold' id='school'></sub>
                    </div>
                    <div>
                        <button 
                        className='w-full p-3 bg-[#007aff] rounded-lg text-white mb-2 hover:-translate-y-0.5'>
                            Join Now
                        </button>
                    </div>
                </form>
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
