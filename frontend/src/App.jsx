import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import BookTicket from './components/BookTicket'
import MyBookings from './components/MyBookings'
import Contact from './components/Contact'
import Footer from './components/Footer'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/book-ticket' element={<BookTicket />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
