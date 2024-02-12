import { useEffect, useRef } from "react"
import { FaTimesCircle } from "react-icons/fa"

const Alert = ({text, type}) => {
  const alertRef= useRef()
	function hideAlert(){
		alertRef.current.style.opacity=0.2
		alertRef.current.style.visibility='hidden'
	}
	useEffect(()=>{
			setTimeout(()=>{
				hideAlert()
			}, 3000)
	}, [ alertRef])
  return (
    <div ref={alertRef} className={`fixed bg-green-600 z-50 top-2 right-2 gap-2 flex items-center justify-center px-4 py-3 pointer-events-none sm:p-6 sm:items-start`}>
        <p>{text}</p>
        <div><FaTimesCircle /></div>
    </div>
  )
}
export default Alert