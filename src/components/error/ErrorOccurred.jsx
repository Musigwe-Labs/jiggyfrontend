import { FaArrowRotateRight } from "react-icons/fa6";
import { useErrorContext } from "../../contexts/ErrorContext";


export default function ErrorOccurred({setError}){
    const {setAppError}= useErrorContext()

    function resetError(){
        if(!setError){
            setAppError(null)
        }else{
            setError(null)
            setAppError(null)            
        }
        
    }
    return(
    <div className="grid min-h-screen place-items-center">
        <div className="text-center">
            <p className="text-xs">Ooops, Something is wrong</p>
            <a href="#" className="text-blue-500 flex items-center gap-2" onClick={resetError}>
            <FaArrowRotateRight />
                Try reloading the page
            </a>
        </div>
      </div>
    )
}