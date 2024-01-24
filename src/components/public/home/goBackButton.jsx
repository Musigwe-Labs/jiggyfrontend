import { useNavigate} from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";


export default function GoBack(){
    const navigate= useNavigate()
    // console.log(useHistory)

    return (
         <button>
            <FaArrowLeftLong
             size={25}
             className="cursor-pointer"
             onClick={()=>navigate(-1)}
            />
          </button>

    )
}