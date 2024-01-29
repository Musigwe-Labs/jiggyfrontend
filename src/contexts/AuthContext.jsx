 /* eslint-disable react/prop-types */
 import { createContext, useEffect, useState, useContext } from "react";
 import axios from "../services/axios";
 import { getUSerLoginToken, removeFieldFromLS } from "../utils/localStorage";
 import { getUser } from "../utils/user";
 import { useErrorContext } from "./ErrorContext";
 import  Spinner from '../components/common/Spinner'
 import  ErrorOccurred from '../components/error/ErrorOccurred'

 const AuthContext = createContext();

 const AuthContextProvider = ({children}) => {
   const initialState = ()=> ({
      userDetails: {},
      key:getUSerLoginToken(),
      status: 'loading'
    })
   const {setAppError} = useErrorContext() 
   const [state, setState] = useState(initialState);
   const {status, key, userDetails}= state
   const {error, redirect}= status
   const setKey = (newKey) => setState({...state, key:newKey })
   const setStatus = (newStatus) => setState({...state, status:{...newStatus} })
   const setAuthContext = (newContext) => setState({...state, ...newContext })
   const logout = () => {
     setKey('');
     localStorage.removeItem("login");
   };

   useEffect(() => {
    if(key){
        runAsync()
     }else{
        console.log('no key in localStorage')
        setAuthContext({status:{redirect:true}})
     }

    async function runAsync(){
       //load user_details from backend
       try{
         const user=  await getUser({ queryKey: [null, key] })
         setAuthContext({userDetails: {...user.data} , status:'resolved'})
       }catch (err){
         console.log(err)
         if(err?.response?.status==401){
            removeFieldFromLS('login') // remove login from localStorage
            setAuthContext({key:null, redirect:true, status:'redirecting'})
         }else{
            setAuthContext({ status: {error:err} })
            setAppError(err)
          }
       }      
     }  

   }, [key, error]);

    if(status=='loading') return <Spinner /> 
    // if(error) return <ErrorOccurred setError={()=>{ setAuthContext({status:'loading'}) }} /> ;

    return (
     <AuthContext.Provider value={{ key, setKey, logout, userDetails, redirect, setStatus, setAuthContext }}>
       {children}
     </AuthContext.Provider>
   )
 }

 const useAuthContext=()=>{
   const context= useContext(AuthContext)
   if(!context){
     return console.error('Authcontext must be used within Authcontext Provider')
   }

   return context
 }

 export {AuthContextProvider, useAuthContext , AuthContext};
