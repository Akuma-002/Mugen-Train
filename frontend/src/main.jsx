  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { BrowserRouter } from 'react-router-dom'
  import './index.css'
  import App from './App.jsx'
  import LoginInfo from './components/context/LoginInfo.jsx'
import UserInfo from './components/context/UserInfo.jsx'
import TrainList from './components/context/TrainList.jsx'
import DesignInfo from './components/context/DesignInfo.jsx'
import SearchInfo from './components/context/SearchInfo.jsx'
import TrainOne from './components/context/TrainOne.jsx'
import BookingInfo from './components/context/BookingInfo.jsx'
  createRoot(document.getElementById('root')).render(

    <StrictMode>
      <BookingInfo>
      <TrainOne>
      <SearchInfo>
      <LoginInfo>
        <UserInfo>
          <TrainList>
            <DesignInfo>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
            </DesignInfo>
          </TrainList>
        </UserInfo>
      </LoginInfo>
      </SearchInfo>
      </TrainOne>
      </BookingInfo>
    </StrictMode>,
    )