import {useErrorContext} from '../../contexts/ErrorContext'


 function ErrorFallBack({children}){
	const {appError, setAppError} =useErrorContext()
	// console.log('appError', JSON.stringify(appError))

	return(
		<>{
			appError?
				<>
				 <div className="h-screen flex flex-col justify-center items-center my-4" >
				 	<p className='my-2'>opps! something went wrong</p>
				 	<p className="my-4  text-red-800 text-2xl">{appError.message}</p>
				 	<button className="text-red  w-32 py-2 rounded-lg border-[1px] hover:text-blue-500 active:text-sm" onClick={()=>setAppError(false)}>Retry</button>
				 </div>

				</>
			:	<> {children} </>
		}
	</>)
}

export default ErrorFallBack