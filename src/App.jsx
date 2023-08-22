import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './components/public/home/Home'
import Login from './components/public/Login'
import Register from './components/public/Register'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './components/private/dashboard/Dashboard'
import { Privacy } from './components/private/dashboard/Privacy'
import Messages from './components/private/dashboard/Messages'
import Chat from './components/private/dashboard/Chat'
import "./App.css";
import { Wrapper } from './components/private/common/Wrapper'
import { PostsProvider } from './contexts/postContext'
const App = () => {
  let location = window.location;
  

  return (
    <div className='bg-black text-white min-h-screen'>

      <AuthContextProvider>
        <PostsProvider>
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path="/home" element={Wrapper(Home)} />
              <Route exact path='/dashboard' element={Wrapper(Dashboard)} />
              <Route exact path='/privacy' element={Wrapper(Privacy)} />
              <Route exact path='/messages' element={Wrapper(Messages)} />
              <Route exact path='/chat/:friend_name' element={Wrapper(Chat)} />
              <Route exact path="/account/auth/google/callback" element={<Callback />} />
            </Routes>
          </Router>
        </PostsProvider>
      </AuthContextProvider>
    </div>
    
  )
}


export default App
