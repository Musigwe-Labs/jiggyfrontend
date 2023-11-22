import googleLogo from '/src/assets/google.png' 
const backendUrl =import.meta.env.JIGGY_BACKEND_URL
console.log('bacckend: ',backendUrl)

 export default function GoogleButton (){
 	const authUrl=`https://accounts.google.com/o/oauth2/auth?client_id=524267745289-99tcul9q2eos9crnc5krameenh2p59gb.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fjiggybackend.com.ng%2Faccount%2Fauth%2Fgoogle%2Fcallback%2F&response_type=code&scope=email`

 	function googleAuth(){
 		window.location.replace(authUrl)
 	}
	return(
		<button className="flex justify-center items-center  border py-2 px-6 gap-x-2 w-36 rounded-lg border-slate-500" onClick={()=>googleAuth()} >
			<img  src={googleLogo} alt="google logo"  />
			<p>Google</p>
		</button>
	
		)
}