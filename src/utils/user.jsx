import axios from "axios"
import { useWebSocket } from "../contexts/webSocketContext"
import { useEffect, useState } from "react"

// export async function getPosts({ pageParam = 1 }) {
//   const response = await axios.get(
//     `annon/posts/paginated/?page=${pageParam}`,
//   )
//   return response
// }

export function getPosts({ pageParam = 1 }) {
  const [posts, setPosts] = useState([])
  const { isReceivedData, setIsReceivedData } = useWebSocket()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts from the server using axios
        const response = await axios.get(`annon/posts/paginated/?page=${pageParam}`)
        const fetchedPosts = response.data
        // Set the fetched posts in state
        setPosts(fetchedPosts)
        // Reset the WebSocket flag
        setIsReceivedData(false)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Fetch data when pageParam or isReceivedData changes
    fetchData()
  }, [pageParam, isReceivedData, setIsReceivedData])

  return response
}


export async function getSchoolList({ queryKey: [, currentPageIndex, key] }) {
  const headers = {
    Authorization: `Token ${key}`,
  }
  const response = await axios.get(
    `/annon/posts/create/?page=${currentPageIndex}`,
    { headers }
  )
  return response
}
export async function getUser({ queryKey: [, key] }) {
  const headers = {
    Authorization: `Token ${key}`,
  }
  if(key){
  const userDetails = await axios.get("account/annonyuser/", { headers })
  return userDetails
  }
}
export async function getNotifications({ queryKey: [, key] }) {
  const url = "/annon/notifications/view/?page=1"
  const headers = {
    Authorization: `Token ${key}`,
  }
   if(key){
    const response = await axios.get(url, { headers })
    return response
  }
}
export async function getComments({ queryKey: [, id, key] }) {
  const url = "/annon/posts/detail/" + id
  const headers = {
    Authorization: `Token ${key}`,
  }
  if(key){
    const response = await axios.get(url, { headers })
    return response
  }
}