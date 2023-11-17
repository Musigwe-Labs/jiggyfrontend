import HomeFooter from "../../public/home/homeFooter";
import {FaBell as BellIcon}   from  'react-icons/fa'
import {useEffect,useLayoutEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import {useErrorContext} from '../../../contexts/ErrorContext'
import { getNotificationDate } from "../../../utils/formatNotifications"

// icons import
import flames from '../../../assets/flames.svg'
import comments from '../../../assets/message.svg'
import heart from '../../../assets/heart.svg'
import upvote from '../../../assets/upvote.svg'
// import { comment } from "postcss";


// 





export default function Notiifications(){

	const [notifications, setNotifications]=useState([])
	// const {token}= useAuthcontext()
	const {setAppError} = useErrorContext()
	const navigate= useNavigate()
	

	const url='https://jiggybackend.com.ng/annon/notifications/view/?page=1'
	const headers={'Authorization':'Token 0fbfab5a0081b535638ea060643c1bda74d5bdc9'} //churchill's token
	const results= {
		"count": 123,
		"next": "http://api.example.org/accounts/?page=4",
		"previous": "http://api.example.org/accounts/?page=2",
		"results": [
		{
			"id": 0,
			"notification_type": "hot trend",
			"created_at": "2023-11-11T00:00:41.472Z",
			"comment": 0,
			"reply": 0,
			"post": 0,
			"user": [
			  0
			]
		},
		{
			"id": 1,
			"notification_type": "comment",
			"created_at": "2023-11-10T00:06:00.472Z",
			"comment": 0,
			"reply": 0,
			"post": 0,
			"user": [
			  0
			]
		},
		{
			"id": 7,
			"notification_type": "fun trend",
			"created_at": "2023-11-10T14:39:41.472Z",
			"comment": 0,
			"reply": 0,
			"post": 0,
			"user": [
				0
			]
		},
		{
			"id": 8,
			"notification_type": "comment",
			"created_at": "2023-11-09T17:39:41.472Z",
			"comment": 0,
			"reply": 0,
			"post": 0,
			"user": [
				0
			]
		},
		{
			"id": 2,
			"notification_type": "hot trend",
			"created_at": "2023-10-06T15:39:41.472Z",
			"comment": 0,
			"reply": 0,
			"post": 0,
			"user": [
				0
			]
		},
		{
			"id": 3,
			"notification_type": "upvote",
			"created_at": "2022-11-06T15:39:41.472Z",
			"comment": 0,
			"reply": 0,
			"post": 0,
			"user": [
				0
			]
		}
	]
}
	

	useLayoutEffect(()=>{
		axios.get(url,{headers})
		.then(res=>{
			console.log(res)
			setNotifications({...results })
		})
		.catch(err=>{
			console.log(err)
			if(err.response.status==401){
				navigate('/login')
			}else{
				setAppError(err)
			}
		})
	},[])


	function handleClick(){
		navigate('/')
	}

return(
	<>
		<header className=''>
				<div className="flex justify-between items-center px-8 py-6">
					<h1 className="nav text-2xl font-bold bg-gradient-to-l from-[#B416FE40] via-[#FF008A62] to-[#F33F5E] bg-clip-text text-transparent font-openSans ">
					 	Notifications
					 </h1>
					<div className="mark-all text-xs text-[#B20000] font-poppins ">
						Mark all as read
					</div>
				</div>
		</header>
		<main className="grow mb-20  flex flex-col items-center w-full px-3 sm:px-8">
			{
				!notifications.count? <div className="font-poppins">Aww, You don't have any notifications yet.</div>
				:notifications.results.map(el=>{
					const {notification_type:type, created_at}=el
					const time=getNotificationDate(created_at)	

					const Notification=	(
						<div 
							className="notification flex space-between gap-2 items-center w-full px4 py-4 border-b-[1px] border-[#F2F4F5]"
							onClick={handleClick}
						>
							<img 
								src={
									type=='comment'? comments
									:type=='fun trend'? heart
									:type=='hot trend'? flames
									:type=='upvote'? upvote
									:comments
								}
								alt='comment' />
							<div className=" font-sfProDisplay grow">
								<p className=" text-[#505353]">{type=='fun trend'|| type=='hot trend'? 'trending' : type}</p>
								<p className=" text-[#FFFBFB] text-xs">
									{
										type=='comment'? 'Someone commented on your post: '
										:type=='fun trend' ? 'Your posts is trending in the fun section' 
										:type=='hot trend' ? 'Your posts is trending in the hot section' 
										:type=='upvote'? 'Someone made an upvote on your post: '
										: 'new notification'
									}
								</p>	
							</div>
							<p className="time text-[8px] text-right ">{time}</p>
						</div>
					)

					return Notification
				})
			}
		</main>
		<HomeFooter />
	</>

	
	)
}

