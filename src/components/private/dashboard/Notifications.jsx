import HomeFooter from "../../public/home/homeFooter"
import Spinner from "../../common/Spinner"
import ErrorOccurred from "../../error/ErrorOccurred"
import { useRestoreScroll } from "../../../utils/restoreScroll"
import GoBackButton from '../../public/home/goBackButton'
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { getNotifications } from "../../../utils/user"
import { getNotificationDate } from "../../../utils/formatNotifications"
import { useErrorContext } from "../../../contexts/ErrorContext"
import { useAuthContext } from "../../../contexts/AuthContext"
import comments from "../../../assets/message.svg"
export default function Notiifications() {
  const restoreScroll = useRestoreScroll("notifications")
  const { key: token } = useAuthContext()
  const { setAppError } = useErrorContext()
  const navigate = useNavigate()
  const {
    data: notifications,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications", token],
    queryFn: getNotifications,
  })
  useEffect(() => {
    if (!error) {
      setAppError(null)
    } else {
      setAppError(error)
    }
  }, [error, token, notifications])
  return (
    <>
    	<header className="fixed  top-0 w-full h-20 bg-black flex items-center justify-between px-4 ">
	    	<div className="left flex gap-2 items-center">
    	  		<GoBackButton />
        		<h1 className="nav text-2xl font-bold bg-gradient-to-l from-[#B416FE40] via-[#FF008A62] to-[#F33F5E] bg-clip-text text-transparent font-openSans ">
          			Notifications
	        	</h1>
    		</div>
        	<div className="right">
    	  		<p className="mark-all text-xs text-[#B20000] font-poppins ">
        	    	{notifications?.data?.results?.length? 'Mark all as read' : null }
	        	</p>
    		</div>
    	</header>
    	<main className="w-full  pt-20 pb-24">
    	    {error ? (<ErrorOccurred />) : 
			isLoading ? (<Spinner />) : 
			notifications?.data && notifications?.data?.results?.length == 0 ? (
        	<p className=" text-center text-base">
            	I'm Sorry you do not have any new notification
        	</p>) : 
			(notifications?.data?.results?.map((item, index) => {
           		const [el]= item
              	const postId = el?.notification_text.split(',')[0].split(' ').at(-1) || el?.notification_text.split(' ').at(-1)
              	let commentId
				const time=getNotificationDate(el?.created_at)
            	return (
            	  	<div className="flex justify-between border-b-[1px] border-slate-400 py-2 px-4"  key={el.notification_text + index}>
	            	    <Link className="flex items-center"
	                	to={"/comments/" + postId + (commentId? 'tag?=' + commentId:'')}
	            		>
	                	  <img className="w-6" src={comments} alt="comments" />
	                	  {}
		                  <p className="grow text-sm pl-2"> {el?.notification_text}</p>
	    	            </Link>
	        	       <p className="time text-[.7rem] min-w-12 px-2">{time}</p>
              		</div>
        	    )
            }).reverse() )}
    	</main>
      <HomeFooter />
    </>
  )
}