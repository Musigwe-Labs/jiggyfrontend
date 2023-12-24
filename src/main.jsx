import React  from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import App from './App.jsx'
import { AllContextProvider } from './App'
import './index.css'
// import { WebSocketProvider } from './contexts/webSocketContext.jsx'

axios.defaults.baseURL="https://jiggybackend.com.ng"

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
import { useEffect } from 'react'
import RestoreScroll from './utils/restoreScroll.jsx'

const router= createBrowserRouter([
  {
    path:'/',
    element:Wrapper(Home) 
  },
  {
    path:'/home',
    element:Wrapper(Home)
  },
  {
    path:'/login',
    element:Wrapper(Login)
  },
  {
    path:'/register',
    element:Wrapper(Register)
  },
  {
    path:'/comment/:id',
    element:Wrapper(Comment)
  },
  {
    path:'/home/trending',
    element:Wrapper(Home)
  },
  {
    path:'/dashboard',
    element:Wrapper(Dashboard)
  },
  {
    path:'/privacy',
    element:Wrapper(Privacy)
  },
  {
    path:'/messages',
    element:Wrapper(Messages)
  },
  {
    path:'/notifications',
    element:Wrapper(Notifications)
  },
  {
    path:'/chat/:friend_name',
    element:Wrapper(Chat)
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
    path:'/test',
    element: <Test /> 
  }
])

function Test(){
  useEffect(()=>{
    console.log('child use effect')
  })

  return (
    <RestoreScroll>
      <div className="h-[700px] flex justify-between w-full">
        <Link to={'/messages'}>msgs</Link>
        <Link to={'/notifications'}>notes</Link>
     </div>
    </RestoreScroll>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AllContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AllContextProvider>
  </React.StrictMode>,
)


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* <WebSocketProvider> */}
//       <App />
//     {/* </WebSocketProvider> */}
//   </React.StrictMode>,
// )


{/* <QueryClientProvider client={queryClient} >
<ErrorContextProvider>
  <AuthContextProvider>
      <ErrorFallBack>
        <PostSharing.Provider
          value={{
            sharePost: sharePost,
            setSharePost: setSharePost,
          }}
        >
          

        </PostSharing.Provider>
        {sharePost.view && (
          <SharePost sharePost={sharePost} setSharePost={setSharePost} />
        )}
      </ErrorFallBack>
  </AuthContextProvider>
</ErrorContextProvider>
</QueryClientProvider > */}