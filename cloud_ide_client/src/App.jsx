import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Editor from './pages/Editor/Editor'
import Homepage from './pages/Homepage/Homepage'
import { SocketProvider } from './provider/SocketProvider'

const App = () => {
  return (
    <div>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/editor' element={<Editor/>} />
          </Routes>
        </Router>
      </SocketProvider>
    </div>
  )
}

export default App