  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { BrowserRouter } from 'react-router-dom'
  import './index.css'
  import App from './App.jsx'
  import LoginInfo from './components/context/LoginInfo.jsx'
import UserInfo from './components/context/UserInfo.jsx'
import TrainList from './components/context/TrainList.jsx'
  createRoot(document.getElementById('root')).render(

    <StrictMode>
      <LoginInfo>
        <UserInfo>
          <TrainList>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </TrainList>
        </UserInfo>
      </LoginInfo>
    </StrictMode>,
  )