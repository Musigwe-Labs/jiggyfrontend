import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// axios.defaults.timeout=10000
axios.defaults.baseURL='https://jiggybackend.com.ng'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <WebSocketProvider> */}
      <App />
    {/* </WebSocketProvider> */}
  </React.StrictMode>,
)
