/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'
const WebSocketContext = createContext()

const WebSocketProvider = ({ children }) => {
  const[isRecievedData,setIsRecievedData]= useState(false)
  const socket = new WebSocket('wss://jiggybackend.onrender.com/ws/eventstream/')
  useEffect(() => {
    // Establish WebSocket connection
    socket.addEventListener('open',()=>{
      console.log('web socket connection opened')
    })
    socket.addEventListener('message',(event)=>{
      const data = JSON.parse(event.data)
      console.log('recieving data',data)
      setIsRecievedData(true)
    })
    socket.addEventListener('error', (error) => {
      console.error("WebSocket error:", error)
    })
    socket.addEventListener('close',()=>{
      console.log('web socket connection closed')
    })
  })

  return (
    <WebSocketContext.Provider value={{socket , isRecievedData, setIsRecievedData}}>
      {children}
    </WebSocketContext.Provider>
  )
}
const useWebSocket = () => {
  return useContext(WebSocketContext)
}
export { WebSocketProvider, useWebSocket}