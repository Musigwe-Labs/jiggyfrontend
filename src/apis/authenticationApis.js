import axios from "../services/axios";

export const registerUser = async ( data, setSuccess, setError, setRegister) => {

    setRegister(true);

    try{
        const response = await axios.post('account/registration/annoyuser/',
            data
        );
        
        console.log(response.data);
        setSuccess(response.data);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setRegister(false);
}


export const loginUser = async ( data, setSuccess, setError, setSigning) => {

    setSigning(true);

    try{
        const response = await axios.post('account/rest-auth/login/',
            data
        );
        
        console.log(response.data);
        setSuccess(response.data);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setSigning(false);
}


export const userInfo = async ( key, setUserinfo) => {

    try{
        const response = await axios.get('account/rest-auth/user/',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Token ${key}` }
            }
        );
        
        console.log(response.data);
        setUserinfo(response.data);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }
}