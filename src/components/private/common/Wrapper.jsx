import {useEffect} from 'react'
import { useNavigate, useLocation} from "react-router-dom";
import {useAuthContext} from '../../../contexts/AuthContext'
import Spinner from '../../common/Spinner'


export const Wrapper = ({children}) => {
  const {redirect, key, setAuthContext } = useAuthContext() 
  const navigate= useNavigate()
  const{ pathname }= useLocation()


  useEffect(()=>{
    if(!key && redirect){
      //user is not authorized: store the current url if it's not '/login' path and navigate to '/login'. else reset the status.
      if(pathname!= '/login'){
        setAuthContext({
          status:{
            redirect:{
              redirectUrl:pathname
            }
          }  
        });
        navigate('/login')
      }else{
        setAuthContext({status:{}})
      } 
    }
    else if(key && redirect?.redirectUrl){
      //user is authenticated. redirect back to the initial url
      setAuthContext({status:'resolved'})
      navigate(redirect.redirectUrl)
    }else if(key){
      //user is now authenticated with no initial url, navigate to the home page 
      if(pathname== '/login') navigate('/home');
    }

  },[ redirect, key ])

  return (
    <>
      <main className='min-h-screen flex flex-col'>
       
        {redirect===true ? <Spinner /> : children}
        
      </main>
    </>
  );
};
