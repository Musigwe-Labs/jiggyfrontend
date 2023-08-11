import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Login from './components/public/Login'
import Register from './components/public/Register'
import AuthContextProvider from './contexts/AuthContext'
import PrivateRoute from './components/private/PrivateRoute'
import Dashboard from './components/private/dashboard/Dashboard'

const App = () => {

  return (
    <div className='bg-black min-h-screen'>
      <AuthContextProvider>
        <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
        </Router>
      </AuthContextProvider>
    </div>
    
  )
}

export default App
