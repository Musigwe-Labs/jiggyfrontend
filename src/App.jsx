import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Home from './components/public/Home'
import Login from './components/public/Login'
import Register from './components/public/Register'

const App = () => {

  return (
    <div className='bg-black min-h-screen'>
      <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
      </Router>
    </div>
    
  )
}

export default App
