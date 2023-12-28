import {useErrorContext} from '../../contexts/ErrorContext'
import {IoCloudOfflineSharp} from 'react-icons/io5'

 function ErrorFallBack({children}){
	const {appError, setAppError} =useErrorContext()

	const offline=
		<>
			<div className="offline-icon flex gap-1">
				<IoCloudOfflineSharp />
			</div>
			<p className='text-white text-xs font-ibmPlexSans pl-2'>check your internet connection.</p>
		</>
		
		function Alert({message}){
			return (
				<div className={`alert px-4 flex gap-1 items-center bg-[#f33f5e]   text-center pl-4 py-2 fixed right-2 top-1  z-10 rounded`}>
					{ message=="Network Error" && offline}
					{ message!= "Network Error" && <p className='text-white text-xs font-ibmPlexSans'>{ message }</p> }
				</div>
			)
		}
		return (
			<>
				{appError && <Alert message={ appError.message } />}
				{ children }
			</>
		)
}

export default ErrorFallBack