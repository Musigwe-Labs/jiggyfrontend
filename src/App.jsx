import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './components/public/home/Home'
import Login from './components/public/Login'
import Register from './components/public/Register'
import AuthContextProvider from './contexts/AuthContext'
// import PrivateRoute from './components/private/PrivateRoute'
import Dashboard from './components/private/dashboard/Dashboard'
import { Privacy } from './components/private/dashboard/Privacy'
import { Profile } from './components/private/dashboard/Profile'
import Messages from './components/private/dashboard/Messages'
import Chat from './components/private/dashboard/Chat'
import "./App.css";
import { Wrapper } from './components/private/common/Wrapper'
import Callback from './components/public/Callback'
import { useEffect } from 'react'
import axios from './services/axios'

const App = () => {
  let location = window.location;
  
  useEffect(() => {
      const code = new URLSearchParams(location.search).get('code');
      if (code) {
        // Make a POST request to exchange code for access token
        axios.get('/account/auth/google/callback', { code })
          .then(response => {
            const token = response.data.token;
            // Store the token in your app's state or local storage
            console.log("I.m in");
          })          .catch(error => {
            console.error('Error exchanging code for token:', error);
          });
      }
    }, [location]);
  return (
    <div className='bg-black text-white min-h-screen'>
      <AuthContextProvider>
        <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path="/home" element={Wrapper(Home)} />
              <Route exact path='/dashboard' element={Wrapper(Dashboard)} />
              <Route exact path='/profile' element={Wrapper(Profile)} />
              <Route exact path='/privacy' element={Wrapper(Privacy)} />
              <Route exact path='/messages' element={Wrapper(Messages)} />
              <Route exact path='/chat/:friend_name' element={Wrapper(Chat)} />
              <Route exact path="/account/auth/google/callback" element={<Callback />} />
            </Routes>
        </Router>
      </AuthContextProvider>
    </div>
    
  )
}


export default App
