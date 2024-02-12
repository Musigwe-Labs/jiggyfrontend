function daysInWords(day){
	let dayName=''
	switch(day){
		case 1: dayName='Mon'
		break
		case 2: dayName='Tue'
		break
		case 3: dayName='Wed'
		break
		case 4: dayName='Thur'
		break
		case 5: dayName='Fri'
		break
		case 6: dayName='Sat'
		break
		case 0: dayName='Sun'
		break
		default: throw Error('undefined day')
	}
	return dayName
}
 function monthInWords(month){
	let monthName=''
	switch(month){
		case 0: monthName='Jan'
		break
		case 1: monthName='Feb'
		break
		case 2: monthName='Mar'
		break
		case 3: monthName='Apr'
		break
		case 4: monthName='May'
		break
		case 5: monthName='Jun'
		break
		case 6: monthName='Jul'
		break
		case 7: monthName='Aug'
		break
		case 8: monthName='sep'
		break
		case 9: monthName='Oct'
		break
		case 10: monthName='Nov'
		break
		case 11: monthName='Dec'
		break
		default: throw Error('undefined Month')
	}
	return monthName
 }
 //returns a formated notification day. i.e just now, yesterday, oct 6, dec 2023, etc.
 function getNotificationDate(dateCreated){
	let formatedNotificationDate=''
	const notificationDate= new Date(dateCreated)
	const today= new Date()
	const notificationLocaleDate= notificationDate.toLocaleString().split('').splice(0,10).join('')
	const todayLocaleDate= today.toLocaleString().split('').splice(0,10).join('')
	const yesterday= + (today.getMonth()+1).toString().padStart(2,'0') + '/' + (today.getDate()-1).toString().padStart(2,'0') + '/' + today.getFullYear() 
	const currentYear= todayLocaleDate.split('/')[2]
	const NotificationYear= notificationLocaleDate.split('/')[2]
	if(notificationLocaleDate==todayLocaleDate ){
		const oneMinInMilli= 60*1000
		const hours = notificationDate.getHours()
		const formatedHours= hours< 13 ? hours : hours % 12
		let minutes= notificationDate.getMinutes()
		const amPm= hours> 11? 'PM' :'AM'
		const time= Date.now() - notificationDate.getTime() < oneMinInMilli ? 'just now'
			: formatedHours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' +  amPm
		formatedNotificationDate= time
	}
	else if(notificationLocaleDate==yesterday){ 
		formatedNotificationDate='Yst'
	}else if(NotificationYear.includes(currentYear) ){
		formatedNotificationDate= notificationDate.getDate() + ' ' + monthInWords(notificationDate.getMonth()) 
	}else{ 
		const notificationMonth=notificationLocaleDate.split('/')[0]
		formatedNotificationDate= monthInWords(notificationMonth-1) + ' ' + NotificationYear.replace(',' ,'')
	}
	return formatedNotificationDate
 }
export { getNotificationDate}