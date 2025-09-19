import { Outlet } from 'react-router-dom'
import './EmptyLayout.css'

const EmptyLayout = () => (
  <div className="empty-container">
    <Outlet />
  </div>
)

export default EmptyLayout
