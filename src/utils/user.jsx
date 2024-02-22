import axios from "axios"

export async function getPosts({ pageParam = 1 }) {
  const response = await axios.get(
    `annon/posts/paginated/?page=${pageParam}`,
  )
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