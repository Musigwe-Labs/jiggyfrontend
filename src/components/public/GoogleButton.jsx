import googleLogo from '/src/assets/google.png'
import { GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google'


 export default function GoogleButton ({success, err}){

 


	return(
		<a href="https://accounts.google.com/o/oauth2/auth?client_id=524267745289-99tcul9q2eos9crnc5krameenh2p59gb.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fcruise.pythonanywhere.com%2Faccount%2Fauth%2Fgoogle%2Fcallback%2F&response_type=code&scope=email">
		<button className="flex justify-center items-center  border py-2 px-6 gap-x-2 w-36 rounded-lg border-slate-500" >
			<img  src={googleLogo} alt="google logo"  />
			<p>Google</p>
		</button>
		</a>
		
		)
}