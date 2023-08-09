import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AuthLinks from './headers/AuthLinks'
import PubLinks from './headers/PubLinks'

const Header = () => {

    const { key, logout } = useContext(AuthContext);

    const [authheader, setAuthheader] = useState(false);

    useEffect(() => {
        key !== '' ? setAuthheader(true) : setAuthheader(false);
    }, [key])

    return (
        authheader ?
            <AuthLinks logout={logout} /> : <PubLinks />
    )
}

export default Header
