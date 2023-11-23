import { useEffect, useState } from "react";
import Banner from "../common/Banner";
import GoogleButton from "./GoogleButton";
import MSoftButton from "./MSoftButton";
import { Link, useNavigate } from "react-router-dom";
// import AuthIcons from '../common/AuthIcons'
import TermsOfService from "../common/TermsOfService";
import { registerUser } from "../../apis/authenticationApis";
import Select from "react-select";
import axios from "../../services/axios";
import Spinner from "../common/Spinner";
import PasswordInput from "../common/PasswordInput";
import {useErrorContext} from '../../contexts/ErrorContext'

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [register, setRegister] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {setAppError} = useErrorContext()


  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (newPassword) => {
      setPassword(newPassword);
    };

    const handleConfirmPasswordChange = (newConfirmPassword) => {
      setConfirmPassword(newConfirmPassword);
    };

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      school: selectedOption.value.school_acronym,
    };

    console.log('data: ', data)
    if (password !== confirmPassword) {
      alert("Password mismatch");
    } else {
      registerUser(data, setSuccess, setError, setRegister);
  }
};
  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    if (error !== null) {
      alert('error in handleselectchange: '+JSON.stringify(error));
      // console.log(error)
      setError(null);
    }
  };

  useEffect(() => {
    if (success !== null) {
      navigate("/login");
    }
  }, [navigate, success]);

  useEffect(() => {
    axios
      .get("account/registration/annoyuser/")
      .then((response) => {
        console.log("response is", response);

        const fetchedOptions = response.data.map((school) => ({
          value: school,
          label: school.name,
        }));
        setOptions(fetchedOptions);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error fetching options", error)
        const {message}=error
        setAppError({message})
    });
  }, []);
  
if(isLoading) return <Spinner /> ;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-6 lg:px-24 mt-4">
      <Banner />
      <div className="md:px-6 lg:px-16 md:mt-12">
        <div className="flex justify-start text-gray-300">
          <div className="text-lg py-2 pr-4 border-b-2 border-gray-300">
            Sign in
          </div>
          <div className="text-lg py-2 border-b-2 border-blue-500">Sign up</div>
          <div className="grow border-b-2 border-gray-300"></div>
        </div>

        <div className="my-12">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <div className="relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max">
                E-mail
              </div>
              <input
                type="email"
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700"
                placeholder="Enter an Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>

            <PasswordInput
              onPasswordChange={handlePasswordChange}
              onConfirmPasswordChange={handleConfirmPasswordChange}
              password={password}
              confirmPassword={confirmPassword}
              />

            </div>

            <div>
              <div className="relative z-10 mb-[-12px] ml-3 text-gray-300 text-md bg-black max-w-max">
                School
              </div>
              <Select
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="Select your School"
                className="w-full bg-transparent border border-gray-800 rounded-md p-3 text-gray-500 placeholder-gray-700"
              />
            </div>

            <div>
              <button className="w-full p-3 bg-[#007aff] hover:bg-[#0d4580] rounded-lg text-white mt-6 mb-2">
                {register ? "Joining..." : "Join Now"}
              </button>
            </div>
          </form>
        </div>

        <div className="flex justify-between text-gray-300 space-x-4 items-center">
          <div className="grow border border-gray-500 h-0"></div>
          <div>Or sign up with</div>
          <div className="grow border border-gray-500 h-0"></div>
        </div>
        <div className="alternate-sign-in  flex justify-center gap-x-8 my-6">
          <GoogleButton />
        </div>
        {/* <AuthIcons /> */}
        <div className="flex justify-center text-gray-400 space-x-1 my-10">
          <span>Have an Account?</span>{" "}
          <Link to="/login" className="text-[#007aff]">
            Sign in
          </Link>
        </div>

        <TermsOfService />
      </div>
    </div>
  );
};

export default Register;
