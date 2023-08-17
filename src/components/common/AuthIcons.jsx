import Google from "../../assets/google.png";
import Microsoft from "../../assets/microsoft.png";
import { useGoogleLogin } from "@react-oauth/google";

const AuthIcons = () => {
  const googleSignIn = useGoogleLogin({
    onSuccess: (response) => console.log(response),
  })
  return (
    <div className="flex justify-between mt-4 space-x-4 text-gray-400 text-sm">
      <a
        // id="g_id_onload"
        // data-client_id="524267745289-99tcul9q2eos9crnc5krameenh2p59gb.apps.googleusercontent.com"
        onClick={googleSignIn}
        className="flex cursor-pointer justify-center items-center border border-gray-500 rounded-md py-2 w-[47%] space-x-1"
      >
        <img src={Google} alt="google icon" className="h-4" />
        <span>Google</span>
      </a>
      <div className="flex justify-center items-center border border-gray-500 rounded-md py-2 w-[47%] space-x-1">
        <img src={Microsoft} alt="microsoft icon" className="h-4" />
        <span>Microsoft</span>
      </div>
    </div>
  )
}

export default AuthIcons;
