import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {useAuthContext} from '../../../contexts/AuthContext'


export const Wrapper = (Component) => {
//   const {redirect} = useAuthContext() 
//   const navigate= useNavigate()

//   useEffect(()=>{
//     console.log('new redirect')
//     if(redirect?.url){
//         navigate(url)
//         setRedirect(null)
//     }
// },[ redirect ])

  return (
    <>
      <main className='min-h-screen flex flex-col'>
        <Component />
      </main>
    </>
  );
};
