import {useState, createContext, useContext} from 'react'
const ErrorContext=createContext()
const ErrorContextProvider = ({children}) => {
	const [appError, setAppError]= useState(false)
    return <ErrorContext.Provider value={{appError, setAppError}} >
     		{children}
     </ErrorContext.Provider>
}
const useErrorContext=()=>{
  const context= useContext(ErrorContext)
  if(!context){
    return
  }
  return context
}
export  {ErrorContextProvider, useErrorContext }