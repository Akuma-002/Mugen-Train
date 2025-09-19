import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './MainLayout.css' // optional specific layout styles

const MainLayout = () => (
  <>
    <Navbar />
    <main className="main-container">
      <Outlet />
    </main>
    <Footer />
  </>
)

export default MainLayout
