import axios from "../services/axios";

export const registerUser = async ( data, setSuccess, setError, setRegister) => {
    setRegister(true)
    try{
        const response = await axios.post('account/registration/annoyuser/', data )
        setSuccess(response.data)
    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server')
        } else {
            setError(err.response.data)
        }
    }
    setRegister(false);
}

export const loginUser = async ( data, setSuccess, setError, setSigning) => {
    setSigning(true);
    try{
        const response = await axios.post('account/rest-auth/login/', data)
        setSuccess(response.data)
    }
    catch (err) {
        console.log(err)
        setError(err)
    }
    setSigning(false);
}
// for google sign in
export const loginUserWithGoogle= async (data, setSuccess, setError, setSigning)=>{
    setSigning('true')
    try{
        const response=await axios.post('account/rest-auth/google-sign-in', data)
        setSuccess(response)
    }
    catch(err){
        if (!err?.response) {
            setError('No Response from Server')
        } else {
            setError(err.response.data)
        }
    }
    setSigning(false);
}

export const userInfo = async ( key, setUserinfo) => {
    try{
        const response = await axios.get('account/rest-auth/user/',{
            headers: { 'Accept' : 'application/json', 'Authorization' : `Token ${key}` }
        })
        setUserinfo(response.data);
    }
    catch (err) {
        if (!err?.response) {
            // setError('No Response from Server')
        } else {
            // setError(err.response.data);
        }
    }
}