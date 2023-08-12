import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Login from './components/public/Login'
import Register from './components/public/Register'
import AuthContextProvider from './contexts/AuthContext'
import PrivateRoute from './components/private/PrivateRoute'
import Dashboard from './components/private/dashboard/Dashboard'
import { Privacy } from './components/private/dashboard/Privacy'
import { Profile } from './components/private/dashboard/Profile'
import Messages from './components/private/dashboard/Messages'
import Chat from './components/private/dashboard/Chat'
import "./App.css";

const App = () => {

  return (
    <div className='bg-black text-white min-h-screen'>
      <AuthContextProvider>
        <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/privacy' element={<Privacy />} />
              <Route exact path='/messages' element={<Messages />} />
              <Route exact path='/chat/:friend_name' element={<Chat />} />
            </Routes>
        </Router>
      </AuthContextProvider>
    </div>
    
  )
}

export default App
