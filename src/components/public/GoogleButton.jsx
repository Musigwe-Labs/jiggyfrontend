import googleLogo from '/src/assets/google.png'
import { GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google'


 export default function GoogleButton ({success, err}){

 	 const login =useGoogleLogin({
    onSuccess: tokenResponse=>success(tokenResponse),
    onError: ()=>err()
  })


	return(
		
		<button className="flex justify-center items-center  border py-2 px-6 gap-x-2 w-36 rounded-lg border-slate-500"  onClick={()=>login()}>
			<img className=" " src={googleLogo} alt="google logo"  />
			<p>Google</p>
		</button>
		
		)
}