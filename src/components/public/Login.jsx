import { useEffect, useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import AuthIcons from '../common/AuthIcons'
import TermsOfService from "../common/TermsOfService";
import Banner from "../common/Banner";
// import { useLoginUserMutation } from '../../services/authApi'
import GoogleButton from "./GoogleButton";
import { useLocation } from "react-router-dom";
import { loginUser } from "../../apis/authenticationApis";
import EyeOpenIcon from "../../assets/blue-eye.png";
import EyeClosedIcon from "../../assets/closed-eye.png";


import { useAuthContext } from '../../contexts/AuthContext'
import { useErrorContext } from '../../contexts/ErrorContext'
import {getUser} from '../../utils/user'

//import {  } from '../..//ErrorContext'


const getTokenFromSearchParams = (search) => {
  const query = new URLSearchParams(search); // parse params to object format
  const token = query.get("token") ? query.get("token") : null;
  return token;
};


const Login = () => {
  const navigate = useNavigate();
  const {setAppError} = useErrorContext()
  const {key, setKey, setUserDetails} = useAuthContext()
  // const { redirect, setRedirect} =useAuthContext()
  // console.log('redirect', redirect)

  /**const [email, setEmail] = useState();*/
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signing, setSigning] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { search } = useLocation();
  useLayoutEffect(()=>{
   if(key) navigate('/home') ;
  }, [key])
  
  useEffect(() => {
    if(success==null && Boolean(search)){
        const token=getUrlToken(search)
        if(token){
          setSuccess({key:token})
        }
        else{
          setError({message:"can't retrieve token"})
        }
    }

    if (success !== null) {
      runAsync()
      async function runAsync(){
        const key=success.key
        //load user_details from backend
        try{
          const user=  await getUser({ queryKey: [null, key] })
          localStorage.setItem("login", JSON.stringify({ key: success.key }));
          setKey(success.key)
          navigate("/home");
        }catch (err){
          console.log(err)
          if(err?.response?.status==401){
            removeFieldFromLS('login') // remove lodin from localStorag
            setKey(null)
            setAppError({message:'account not found'})
          }else{
            setAppError(err)
          }
        }
      }
    }
     
   if (error !== null) {
    console.log(error)
    setSigning(false)
    if(error?.response?.data?.type=='validation_error'){
      setAppError({message:'account not found '})
    }else{
      setAppError(error)
    }
  }
  }, [success, error])

  const handleLogin = (e) => {
    e.preventDefault();
    const data = { email, password };
    loginUser(data, setSuccess, setError, setSigning);
  }
 
  // useEffect(() => {
  //   if (localStorage.getItem("login") !== null) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-6 lg:px-24 mt-4">
      <Banner />

      <div className="md:px-6 lg:px-16 md:mt-12">
        <div className="flex justify-start text-gray-300">
          <div className="text-lg py-2 border-b-2 border-blue-500">Sign in</div>
          <div className="grow border-b-2 border-gray-300"></div>
        </div>

        <div className="my-12">
          <form onSubmit={handleLogin} className="space-y-4" >
            <div>
              <div className="relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max">
                Email
              </div>
              <input
                type="email"
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                name='email'

              />
            </div>

            <div>
              <div className="relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max">
                Password
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Add this onChange handler
                  required
                  name='password'
                />
                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <img
                      src={EyeOpenIcon}
                      alt="Hide Password"
                      className="w-6"
                    />
                  ) : (
                    <img
                      src={EyeClosedIcon}
                      alt="Show Password"
                      className="w-6"
                    />
                  )}
                </p>
              </div>
            </div>

            <div>
              <button type='submit' className="w-full p-3 bg-[#007aff] hover:bg-[#0d4580] rounded-lg text-white mt-6 mb-2">
                {signing ? "Logging in..." : "Login"}
              </button>

              <div className="w-full flex justify-end text-md text-gray-300">
                <Link to="/login">Forgot Password?</Link>
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-between text-gray-300 space-x-4 items-center">
          <div className="grow border border-gray-500 h-0"></div>
          <div>Or sign in with</div>
          <div className="grow border border-gray-500 h-0"></div>
        </div>

        <div className="alternate-sign-in  flex justify-center my-6">
          <GoogleButton />
        </div>

        <div className="flex justify-center text-gray-400 space-x-1 my-10">
          <span>{"Don't have an Account?"}</span>{" "}
          <Link to="/register" className="text-[#007aff]">
            Sign up
          </Link>
        </div>

        <TermsOfService />
      </div>
    </div>
  );
};

export default Login;
