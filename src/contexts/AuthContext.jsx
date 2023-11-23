/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";
import axios from "../services/axios";
import { getUSerLoginToken } from "../utils/getUserLocalStorageData";

const AuthContext = createContext();
const token= getUSerLoginToken()

const AuthContextProvider = (props) => {
  const [key, setKey] = useState(token);
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("")

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
        const user_response = await axios.get("account/annonyuser/", {
            Authorization: `Token ${token}`,
          });
          setUserDetails(user_response.data)
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
