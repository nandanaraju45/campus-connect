import React from 'react'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import LearnMorePage from './pages/LearnMorePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/learn-more' element={<LearnMorePage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
