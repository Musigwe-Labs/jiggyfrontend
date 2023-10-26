import HomeFooter from "../../public/home/homeFooter";
import {FaBell as BellIcon}   from  'react-icons/fa'
 import {useEffect, useState} from 'react'



export default function Notiifications(){
//when you click register it as opened
const notifications=[
		{
			day:'today',
			note:[
				{
					id:'123456h',
					text: [
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea est, atque ."
					],
					sub:'@hacksultan',
					read:false,
					time: '1m ago.',
					notificationCount: function(){
						 return this.text.length
					}
				},
				{
					id:'1234g56',
					text: [
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea est, atque ."
					],
					sub:'@hacksultan',
					read:false,
					time: '1m ago.',
					notificationCount: function(){
						 return this.text.length
					}
				}

			]	
		},
		{
			day:'yesterday',
			note:[
				{
					id:'123456',
					text: [
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea est, atque ."
					],
					sub:'@hacksultan',
					read:false,
					time: '1m ago.',
					notificationCount: function(){
						 return this.text.length
					}
				},
				{
					id:'123r456',
					text: [
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea est, atque ."
					],
					sub:'@hacksultan',
					read:false,
					time: '1m ago.',
					notificationCount: function(){
						 return this.text.length
					}
				}

			]	
		},
		{
			day:'Friday',
			note:[
				{
					id:'123457',
					text: [
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea est, atque ."
					],
					sub:'@hacksultan',
					read:false,
					time: '1m ago.',
					notificationCount: function(){
						 return this.text.length
					}
				},
				{
					id:'123456a',
					text: [
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea est, atque ."
					],
					sub:'@hacksultan',
					read:false,
					time: '1m ago.',
					notificationCount: function(){
						 return this.text.length
					}
				}

			]	
		},
		{
			day:'Thursday',
			note:[
				{
					id:'1234h5b',
					text: [
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea est, atque ."
					],
					sub:'@hacksultan',
					read:false,
					time: '1m ago.',
					notificationCount: function(){
						 return this.text.length
					}
				},
				{
					id:'123ee456',
					text: [
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ea est, atque ."
					],
					sub:'@hacksultan',
					read:false,
					time: '1m ago.',
					notificationCount: function(){
						 return this.text.length
					}
				}

			]	
		}

]
const [fetchData, setFetch]= useState(false)
useEffect(()=>{
	fetch('https://moviebox-hng-chapter-codes.vercel.app/').then(res=>console.log(res)).catch(err=>console.log(err))
},[fetchData])

// console.log(notifications[0].notificationText[0].notificationCount())
return(
	<>
		<header className=''>
				<div className="flex justify-between items-center px-8 py-6">
					<h1 className="nav text-[28px] font-bold bg-gradient-to-l from-[#B416FE40] via-[#FF008A62] to-[#F33F5E] bg-clip-text text-transparent">
					 	Notifications

					 </h1>
					<div>
						<BellIcon size={25} />
					</div>
				</div>
		</header>
		<button onClick={()=>setFetch(true)}>fetch</button>
		<main className="grow mb-20  flex flex-col items-center w-full">
		  
			{
				notifications.map(el=>(
					<div className="day-wrapper text-left" key={el.day} >
						<h6 className='day pl-12 py-4 text-[.75rem] font-bold capitalize'>{el.day}</h6>
						{el.note.map(notification=>(
							<div className=" note-wrapper flex  mb-4" key={notification.id}>
								<div className="note-hero bg-gradient-to-b from-[red,33%] via-[blue, 66%] to-[#fff]  w-10 h-10 border-2  leading-[2.5rem] text-center"> </div>
								<div className="note-msg pl-4  text-[10px] flex flex-col "> 
									<p className="w-60 h-6 overflow-hidden text-ellipsis whitespace-nowrap">{notification.text.at(-1)}</p>
									<p className="note-time text-gray-400">{notification.time}</p>
									</div>
								<p className={`note-count ${notification.read?'bg-black': "bg-[#F84135] "} rounded-full min-h-[1.5rem] min-w-[1.5rem] text-[10px] text-center self-start ml-4 leading-[22px] `}>{notification.notificationCount()}</p>
							</div>

							))}
					</div>

					))
			}
			
		</main>
		<HomeFooter />
	</>

	
	)
}


