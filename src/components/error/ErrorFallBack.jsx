import {useErrorContext} from '../../contexts/ErrorContext'
import {IoCloudOfflineSharp} from 'react-icons/io5'

 function ErrorFallBack({children}){
	const {appError, setAppError} =useErrorContext()

	const offline=
		<>
			<div className="offline-icon">
				<IoCloudOfflineSharp />
			</div>
			<p className='text-white text-xs font-ibmPlexSans pl-2'>check your internet connection.</p>
		</>
		
		function Alert({message}){
			console.log('na here')
			return (
				<div className={`offline bg-[#f33f5e] w-full flex items-center pl-4 py-2 `}>
					{ message=="Network Error" && offline}
					{ message!= "Network Error" && <p className='text-white text-xs font-ibmPlexSans pl-2'>{ message }</p> }
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