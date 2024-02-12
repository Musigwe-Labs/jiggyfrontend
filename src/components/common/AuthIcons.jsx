import Google from "../../assets/google.png"
import Microsoft from "../../assets/microsoft.png"
import { useEffect, useState } from "react"
import axios from "../../services/axios"
const AuthIcons = () => {
  const [authUrl, setAuthUrl] = useState(null)
  const handleLogin = async () => {
    try {
      const response = await axios.get("/account/auth/google")
      setAuthUrl(response.data.auth_url)
    } catch (error) {
      console.error("Error fetching auth URL:", error)
    }
  }
  useEffect(() => {
    handleLogin()
  }, [])
  return (
    <div className="flex justify-between mt-4 space-x-4 text-gray-400 text-sm">
      <a
        href={authUrl}
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

export default AuthIcons
