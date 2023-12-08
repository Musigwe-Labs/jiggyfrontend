import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./components/public/home/Home";
import Login from "./components/public/Login";
import Register from "./components/public/Register";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ErrorContextProvider } from "./contexts/ErrorContext";
import Comment from "./components/public/home/comments";
import Dashboard from "./components/private/dashboard/Dashboard";
import { Privacy } from "./components/private/dashboard/Privacy";
import Messages from "./components/private/dashboard/Messages";
import Notifications from "./components/private/dashboard/Notifications";
import Chat from "./components/private/dashboard/Chat";
import "./App.css";
import { Wrapper } from "./components/private/common/Wrapper";
import Feedback from "./components/private/dashboard/Feedback";
import Help from "./components/private/dashboard/Help";
import WhatsNew from "./components/private/dashboard/WhatsNew";
import ErrorFallBack from "./components/error/ErrorFallBack";
import SharePost from "./components/public/home/sharePost";
import Alert from "./components/public/Alert";
import { createContext, useState } from "react";
import CreatePostPage from "./components/public/home/createPostPage";

export const PostSharing = createContext();

const App = () => {
  const [sharePost, setSharePost] = useState({ post: {}, view: false });

  return (
    <div className="bg-black text-white min-h-screen">
    <ErrorContextProvider>
      <AuthContextProvider>
          <ErrorFallBack>
            <PostSharing.Provider
              value={{
                sharePost: sharePost,
                setSharePost: setSharePost,
              }}
            >
              <Router>
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
                  {/* <Route exact path="/test" element={<CreatePostPage />} /> */}
                </Routes>
              </Router>
            </PostSharing.Provider>
            {sharePost.view && (
              <SharePost sharePost={sharePost} setSharePost={setSharePost} />
            )}
          </ErrorFallBack>
      </AuthContextProvider>
    </ErrorContextProvider>
    </div>
  );
};

export default App;
