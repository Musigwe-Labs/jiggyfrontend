import {useNavigate} from 'react-router-dom'
export const navigateTo=(url)=>{
	const navigate= useNavigate()
	navigate(url)
	return null
} 