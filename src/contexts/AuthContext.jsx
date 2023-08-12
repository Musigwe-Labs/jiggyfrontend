import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const loginData = JSON.parse(localStorage.getItem('login'));

    
    const [key, setKey] = useState(loginData ? loginData.key : '');

    const logout = () => {
        setKey('');
        localStorage.removeItem('login');
        window.location.reload();
    }

    useEffect(() => {
        
        if(localStorage.getItem('login')){
            
            setKey(loginData.key);
        }
    }, [loginData])


    return(
        <AuthContext.Provider value={{ key, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider