 /* eslint-disable react/prop-types */
 import { createContext, useEffect, useState, useContext } from "react";
 import axios from "../services/axios";
 import { getUSerLoginToken, removeFieldFromLS } from "../utils/localStorage";
 import { getUser } from "../utils/user";
 import { useErrorContext } from "./ErrorContext";


 const AuthContext = createContext();
 const token= getUSerLoginToken()

 const AuthContextProvider = (props) => {
   const [key, setKey] = useState(token);
   const [userDetails, setUserDetails] = useState({});
   const [redirect, setRedirect] = useState(null);
   const [error, setError] = useState("")
   const {setAppError} = useErrorContext()

   const logout = () => {
     setKey("");
     localStorage.removeItem("login");
     window.location.href = "/login";
   };

   useEffect(() => {
     // if (token!=key) {
     //   setKey(token);
     // }
          runAsync()
          async function runAsync(){
           //load user_details from backend
           try{
             const user=  await getUser({ queryKey: [null, key] })
           }catch (err){
             console.log(err)
             if(err?.response?.status==401){
               console.log(true)
               removeFieldFromLS('login') // remove lodin from localStorag
               setKey(null)
               setRedirect({url:'/login'})
             }else{
               setAppError(err)
             }
           }
          }

   }, [key]);

   return (
     <AuthContext.Provider value={{ key, setKey, logout, userDetails, setUserDetails, error, setError, redirect, setRedirect }}>
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
