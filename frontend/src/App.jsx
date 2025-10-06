import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import BookTicket from './components/BookTicket'
import MyBookings from './components/MyBookings'
import Contact from './components/Contact'
import Ticket from './components/Ticket'
import MainLayout from './layouts/MainLayout'
import EmptyLayout from './layouts/EmptyLayout'
import User from './components/User'
import EditProfile from './components/EditProfile'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        {/* Pages with Navbar & Footer */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/book-ticket' element={<BookTicket />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/ticket/:id' element={<Ticket />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/user' element={<User />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Route>

        {/* Pages without Navbar & Footer */}
        <Route element={<EmptyLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
