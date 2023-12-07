import {useErrorContext} from '../../contexts/ErrorContext'
import {IoCloudOfflineSharp} from 'react-icons/io5'


 function ErrorFallBack({children}){
	const {appError, setAppError} =useErrorContext()

	const Offline=
		<div className={`offline bg-[#f33f5e] w-full flex items-center pl-4 py-2 `}>
			<div className="offline-icon">
				<IoCloudOfflineSharp />
			</div>
			<p className='text-white text-xs font-ibmPlexSans pl-2'>check your internet connection.</p>
		</div>
		
		if(!appError){
			return children
		}
		else if(appError.message!="Network Error"){
			return (
				<div className="h-screen flex flex-col justify-center items-center" >
					<p className='my-2'>opps! something went wrong</p>
					<p className="my-4  text-red-800 text-2xl">{appError.message}</p>
					<button className="text-red  w-32 py-2 rounded-lg border-[1px] hover:text-blue-500 active:text-sm" onClick={()=>setAppError(false)}>Retry</button>
				</div>
			)	
		}else if(appError?.message=='Network Error' && Offline){
			return (
				<>
					{Offline}
					{children}
				</>
			)
		}else{
			return children
		}
}

export default ErrorFallBack