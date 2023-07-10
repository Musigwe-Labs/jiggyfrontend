import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Login from './components/public/Login'
import Register from './components/public/Register'
import Messages from './components/pages/Messages'
import "./App.css"
import Chat from './components/pages/Chat'
import MessagesLayout from './components/pages/MessagesLayout'

const App = () => {

  return (
    <div className='bg-black min-h-screen '>
      <Router>
          <Header />
          <Routes>
            {/* <Route exact path="/" element={<Login />} /> */}
            <Route exact path="/login" element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/messages' element={<MessagesLayout/>}/>
            {/* <Route exact path='/chat' element={<Chat/>}/> */}

          </Routes>
      </Router>
    </div>
    
  )
}

export default App
