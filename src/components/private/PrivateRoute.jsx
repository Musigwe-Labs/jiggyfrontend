import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('login')) === null){
            navigate('/login');
        }
    }, [children])

    return children
}

export default PrivateRoute