/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";
import axios from "../services/axios";
import { getUSerLoginToken } from "../utils/getUserLocalStorageData";
import { useErrorContext } from "./ErrorContext";

const AuthContext = createContext();
const token= getUSerLoginToken()

const AuthContextProvider = (props) => {
  const [key, setKey] = useState(token);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("")
  const {setAppError} = useErrorContext()

  const logout = () => {
    setKey("");
    localStorage.removeItem("login");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (token!=key) {
      setKey(token);
    }
    let fetchUser = async () => {
      const headers = {
      Authorization: `Token ${token}`,
    };
      try{
         const user_response = await axios.get("account/annonyuser/", {
            headers,
          });
         console.log('finally')
          setUserDetails(user_response.data)
      }catch(err){
        console.log(err)
        setAppError(err)
      }
    }
    fetchUser();
  }, [key]);

  return (
    <AuthContext.Provider value={{ key, logout, userDetails, error, setError }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext=()=>{
  const context= useContext(AuthContext)
  if(!context){
    return console.error('Authcontext must be used within Authcontext Provider')
  }

  return context
}

export {AuthContextProvider, useAuthContext , AuthContext};
