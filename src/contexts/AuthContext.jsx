/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "../services/axios";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const loginData = JSON.parse(localStorage.getItem("login"));
  const [key, setKey] = useState(loginData ? loginData.key : "");
  const [userDetails, setUserDetails] = useState({});

  const logout = () => {
    setKey("");
    localStorage.removeItem("login");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (localStorage.getItem("login")) {
    //   90;
      setKey(loginData.key);
    }
    let fetchUser = async () => {

        const user_response = await axios.get("account/annonyuser/", {
            Authorization: `Token ${loginData.key}`,
          });
          setUserDetails(user_response.data)
    }
    fetchUser();
  }, [loginData]);

  return (
    <AuthContext.Provider value={{ key, logout, userDetails }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
