import React, { useContext, useState } from 'react'
import { BookingInfoContext } from './context/BookingInfo';
import { TrainOneContext } from './context/TrainOne.jsx';
import { SearchInfoContext } from './context/SearchInfo.jsx';
import { UserContext } from './context/UserInfo.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_SERVER_API;
  const {booking, setBooking} = useContext(BookingInfoContext);
  const {user, setUser} = useContext(UserContext);
  const email = user.email;
  const {trainOne} = useContext(TrainOneContext);
  const {searchInfo} = useContext(SearchInfoContext);
  const date = new Date(searchInfo.date);
  const isoDate = new Date(date).toISOString();
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
  const handleSubmit = async (e)=>{
    console.log(booking);
    try{
      const response = await axios.post(`${API_URL}/users/booking`, {booking, email})
      console.log(response)
      if(response.data.success){
        const res = await axios.post(`${API_URL}/users/refreshData`, {email})
        console.log(res.data.user);
        setUser(res.data.user);
        navigate('/user')
      }
    }catch(e){
      console.log(e);
    }
  }
  return (
    <div >
      <div className="manager"></div>
      <div className='flex items-center flex-col'>
        <div className='trainDetails rounded-md p-4 shadow-lg border w-[70%]'>
          <h2 className='text-2xl font-semibold mb-4 text-black text-left'>{trainOne.train_name}, (#{trainOne.train_number})</h2>
          <hr />
          <div className='flex justify-between'>
            <div className="sourceBox first-letter">
              <p className='inline'>{trainOne.departure_time},</p>
              <p className="inline ml-3 text-gray-500 text-lg font-mono">
                {formattedDate}
              </p>
              <p className='text-left'>
                {trainOne.departure_station}
              </p>
            </div>
            <div className="timeBox flex items-center">
              <hr className='w-10 border-black-800 mx-2'/>
              <p >
                {(() => {
              const totalTime = trainOne.total_time.replace(':', 'h ') + 'm';
              return totalTime;
            })()}
              </p>
              <hr className='w-10 border-black-800 mx-2'/>
            </div>
            <div className='destinationBox'>
              <p className='inline'>{(() => {
                  const [depHours, depMinutes] = trainOne.departure_time.split(':').map(Number);
                  const [totalHours, totalMinutes] = trainOne.total_time.split(':').map(Number);
                  let totalDepartureMinutes = depHours * 60 + depMinutes;
                  let totalTravelMinutes = totalHours * 60 + totalMinutes;
                  let arrivalMinutes = totalDepartureMinutes + totalTravelMinutes;
                  arrivalMinutes %= 24 * 60;
                  const arrivalHours = String(Math.floor(arrivalMinutes / 60)).padStart(2, '0');
                  const arrivalMins = String(arrivalMinutes % 60).padStart(2, '0');
                  return `${arrivalHours}:${arrivalMins}`;
                })()},</p>
                <p className='inline ml-3 text-gray-500 text-lg font-mono'>
                  {(() => {
                  const [depYear, depMonth, depDay] = searchInfo.date.split('-').map(Number);
                  const [depHours, depMinutes] = trainOne.departure_time.split(':').map(Number);
                  const [totalHours, totalMinutes] = trainOne.total_time.split(':').map(Number);

                  const departure = new Date(depYear, depMonth - 1, depDay, depHours, depMinutes);
                  const totalDurationMs = (totalHours * 60 + totalMinutes) * 60 * 1000;
                  const arrival = new Date(departure.getTime() + totalDurationMs);
                  return arrival.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
                })()}
                </p>
                <p className='text-right'>
                  {trainOne.arrival_station}
                </p>
            </div>

          </div>
          
        </div>
        <div className='paymentBox rounded shadow w-[70%] my-5 px-8 py-6'>
          <div className='flex justify-between my-3'>
            <p>Ticket price   -- </p>
            <p >{booking.totalFare}</p>
          </div>
          <div className='flex justify-between my-3'>
            <p>
              Service Cost   -- 
            </p>
            <p>
              0
            </p>
          </div>
          <div className='flex justify-between my-3'>
            <p>
              Platform Cost   --
            </p>
            <p>0</p>
          </div>
          <hr />
          <p>
            Total Price - {booking.totalFare}
          </p>
        </div>
        <button className='bg-blue-600 hover:bg-blue-900 text-white hover:text-white ' onClick={handleSubmit}>
          Book Ticket
        </button>
      </div>
    </div>
  )
}

export default Payment