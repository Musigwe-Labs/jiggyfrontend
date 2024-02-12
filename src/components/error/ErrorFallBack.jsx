import { useEffect, useRef } from 'react'
import {useErrorContext} from '../../contexts/ErrorContext'
import {IoCloudOfflineSharp} from 'react-icons/io5'
import {MdOutlineCancel} from 'react-icons/md'
function ErrorFallBack({children}){
	const { appError, setAppError} =useErrorContext()
	const {message, status=undefined} = appError || { }
	const alertRef= useRef()
	function hideAlert(){
		alertRef.current.style.opacity=0.2
		alertRef.current.style.visibility='hidden'
	}
	useEffect(()=>{
		if(status=='success'){
			console.log(alertRef)
			setTimeout(()=>{
				hideAlert()
			}, 3000)
		}
	}, [message, status, alertRef])
	const offline=
		<>
			<div className="offline-icon flex gap-1">
				<IoCloudOfflineSharp />
			</div>
			<p className='text-white text-xs font-ibmPlexSans pl-2'>check your internet connection</p>
		</>
	function Alert({message, status}){
		return (
			<div 
				className={`alert px-4 flex gap-1 items-center gap-2 ${ status=='success'? 'bg-green-400':'bg-[#f33f5e]'}  text-center pl-4 py-2 fixed right-2 top-1  z-10 rounded  transition-all duration-[1000ms] `}
				ref={alertRef}
			>
				{ message=="Network Error" && offline}
				{ message!= "Network Error" && <p className='text-white text-xs font-ibmPlexSans bg-gr'>{ message }</p> }
				<MdOutlineCancel 
					size={15}
					className='justify-self-end cursor-pointer'
					onClick={hideAlert}
				/>
			</div>
		)
	}
	return (
		<>
			{appError && <Alert 
							message={ appError.message } 
							status={appError.status} 
						/>
			}
			{ children }
		</>
	)
}
export default ErrorFallBack