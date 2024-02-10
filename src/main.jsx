import React  from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import App from './App.jsx'
import { AllContextProvider } from './App'
import './index.css'
// import { WebSocketProvider } from './contexts/webSocketContext.jsx'

axios.defaults.baseURL="https://jiggybackend.onrender.com"

import {
  Notifications,
  Messages,
  Login,
  Register,
  Home,
  Comment,
  Dashboard,
  Privacy,
  Chat,
  Wrapper,
  Feedback,
  Help,
  WhatsNew
} from './utils/exportRoutes'
import RestoreScroll from './utils/restoreScroll.jsx'

const router= createBrowserRouter([
  {
    path:'/',
    element:<Wrapper> <Home /> </Wrapper> 
  },
  {
    path:'/home',
    element:<Wrapper> <Home /> </Wrapper>
  },
  {
    path:'/login',
    element:<Wrapper> <Login /> </Wrapper>
  },
  {
    path:'/register',
    element:<Wrapper> <Register /> </Wrapper>
  },
  {
    path:'/comment/:id',
    element:<Wrapper> <Comment /> </Wrapper>
  },
  {
    path:'/home/trending',
    element:<Wrapper> <Home /> </Wrapper>
  },
  {
    path:'/dashboard',
    element:<Wrapper> <Dashboard /> </Wrapper>
  },
  {
    path:'/privacy',
    element:<Wrapper> <Privacy /> </Wrapper>
  },
  {
    path:'/messages',
    element:<Wrapper> <Messages /> </Wrapper>
  },
  {
    path:'/notifications',
    element:<Wrapper> <Notifications /> </Wrapper>
  },
  {
    path:'/chat/:friend_name',
    element:<Wrapper> <Chat /> </Wrapper>
  },

  {
    path:'/feedback',
    element: <Feedback />
  },
  {
    path:'/help',
    element: <Help /> 
  },
  {
    path:'/whatsnew',
    element: <WhatsNew /> 
  },
  {
    path:'/comments/:id',
    element: <Wrapper> <Comment /> </Wrapper> 
  },
  // {
  //   path:'/test',
  //   element: <Test /> 
  // }
])

// function Test(){
//   useEffect(()=>{
//     console.log('child use effect')
//   })

//   return (
//     <RestoreScroll>
//       <div className="h-[700px] flex justify-between w-full">
//         <Link to={'/messages'}>msgs</Link>
//         <Link to={'/notifications'}>notes</Link>
//      </div>
//     </RestoreScroll>
//   )
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AllContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AllContextProvider>
  </React.StrictMode>,
)

