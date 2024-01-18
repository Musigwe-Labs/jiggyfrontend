//package imports
import { useEffect } from "react";

//components import
import "./App.css";
// import Header from "./components/common/Header";
// import Notifications from "./components/private/dashboard/Notifications";
// import Messages from "./components/private/dashboard/Messages";
// import Login from "./components/public/Login";
// import Register from "./components/public/Register";
// import Home from "./components/public/home/Home";
// import Comment from "./components/public/home/comments";
// import Dashboard from "./components/private/dashboard/Dashboard";
// import { Privacy } from "./components/private/dashboard/Privacy";
// import Chat from "./components/private/dashboard/Chat";
// import { Wrapper } from "./components/private/common/Wrapper";
// import Feedback from "./components/private/dashboard/Feedback";
// import Help from "./components/private/dashboard/Help";
// import WhatsNew from "./components/private/dashboard/WhatsNew";
import ErrorFallBack from "./components/error/ErrorFallBack";
import SharePost from "./components/public/home/sharePost";
// import Alert from "./components/public/Alert";

//context usgae
import { AuthContextProvider, useAuthContext } from "./contexts/AuthContext";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PostSharingContextProvider } from "./contexts/postSharingContext";
import { HomeTabContextProvider } from "./contexts/homeTabContext";

export const queryClient= new QueryClient()

export const  AllContextProvider=({children})=>{
  return (
    <div className="bg-black text-white min-h-screen">
      <QueryClientProvider client={queryClient} >
        <ErrorContextProvider>
          <AuthContextProvider>
              <PostSharingContextProvider>
                <HomeTabContextProvider>
                  <ErrorFallBack>
                    {children}
                    <SharePost />
                  </ErrorFallBack>
                </HomeTabContextProvider>
              </PostSharingContextProvider>
          </AuthContextProvider>
        </ErrorContextProvider>
      </QueryClientProvider >
    </div>
  )
}
const App = () => {
    return (
    <>

   </>
  )
}
export default App;


{/* <Router>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={Wrapper(Home)} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/comment/:id" element={Wrapper(Comment)} />
                        <Route exact path="/home" element={Wrapper(Home)}></Route>
                        <Route exact path="/home/trending" element={Wrapper(Home)} />
                        <Route exact path="/dashboard" element={Wrapper(Dashboard)} />
                        <Route exact path="/privacy" element={Wrapper(Privacy)} />
                        <Route exact path="/messages" element={Wrapper(Messages)} />
                        <Route
                          exact
                          path="/notifications"
                          element={Wrapper(Notifications)}
                        />
                        <Route
                          exact
                          path="/chat/:friend_name"
                          element={Wrapper(Chat)}
                        />
                      <Route exact path="/feedback" element={<Feedback />} />
                      <Route exact path="/help" element={<Help />} />
                      <Route exact path="/whatsnew" element={<WhatsNew />} />
                      <Route exact path="/test" element={<CreatePostPage />} /> 
                    </Routes>
</Router> */}