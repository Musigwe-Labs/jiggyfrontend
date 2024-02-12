import  { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import AuthLinks from './headers/AuthLinks'
import PubLinks from './headers/PubLinks'
const Header = () => {
    const { key, logout } = useAuthContext();
    const [authheader, setAuthheader] = useState(false);
    useEffect(() => {
        key !== '' ? setAuthheader(true) : setAuthheader(false);
    }, [key])
        authheader ? <AuthLinks logout={logout} /> : <PubLinks />
}
export default Header