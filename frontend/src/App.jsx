import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import BookTicket from './components/BookTicket'
import MyBookings from './components/MyBookings'
import Contact from './components/Contact'
import MainLayout from './layouts/MainLayout'
import EmptyLayout from './layouts/EmptyLayout'

function App() {
  return (
    <Routes>
      {/* Pages with Navbar & Footer */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/book-ticket' element={<BookTicket />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/contact' element={<Contact />} />
      </Route>

      {/* Pages without Navbar & Footer */}
      <Route element={<EmptyLayout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
    </Routes>
  )
}

export default App
