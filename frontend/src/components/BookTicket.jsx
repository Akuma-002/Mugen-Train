import React, { useContext, useState } from 'react'
import { TrainOneContext } from './context/TrainOne.jsx';
import { UserContext } from './context/UserInfo.jsx';
import { SearchInfoContext } from './context/SearchInfo.jsx';
import { BookingInfoContext } from './context/BookingInfo.jsx';
import { useNavigate } from 'react-router-dom';

const BookTicket = () => {
  const navigate = useNavigate();
  const {trainOne} = useContext(TrainOneContext);
  const {user} = useContext(UserContext);
  const {searchInfo} = useContext(SearchInfoContext);
  const {booking, setBooking} = useContext(BookingInfoContext);
  const [addTravller, setAddTravller] = useState(false);
  const [seatClass, setSeatClass] = useState("3AC");
  const [newTravaller, setNewTravller] = useState({
    name: '',
        email: '',
        phone: '',
        _id: '',
        address: '',
        state: '',
        district: '',
        city: '',
        pinCode: '',
        dob: '',
        aadhar: '',
        seat:'',
        document: '',
        region: 'India',
  });
  const random = Math.floor(Math.random() * 10) + 1;
  console.log("Train One in Book Ticket:", trainOne);
  console.log(searchInfo.date)
  const date = new Date(searchInfo.date);
  const isoDate = new Date(date).toISOString();
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
  const dob = new Date(user.dob);
  const today = new Date();
  console.log(trainOne.classes_available["3A"].fare)
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  function generateTicketNumber(prefix = "TCKT", trainCode = "HIST") {
    const randomPart = Math.floor(Math.random() * 900 + 100); // random 3-digit number
    const timestamp = Date.now().toString().slice(-3);        // last 3 digits of timestamp
    return `${prefix}-${trainCode}-${randomPart}${timestamp}`;
  }
  // Adjust if the birthday hasn't occurred yet this year
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  const handleChange = (e) => {
    setNewTravller({ ...newTravaller, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e)=>{
    setBooking({...booking, 
      trainName :  trainOne.train_name,
      trainNumber : trainOne.train_number,
      ticketNumber : generateTicketNumber(),
      travelDate : isoDate,
      bookingDate : new Date(),
      origin: searchInfo.source,
      originStation : searchInfo.source + "Jun",
      destinationStation : searchInfo.destination,
      time: trainOne.departure_time,
      seatNumbers: addTravller? ["C" + random.toString(), "C" + (random + 1).toString()]:["C" + random.toString()],
      class: seatClass,
      totalFare: trainOne.classes_available["3A"].fare,
      status: "booked"
    })
    console.log("Train booked -------", booking);
    navigate('/payment')
  }
  return (
    <div className=''>
      <div className='manager '></div>
      <div className='flex justify-center items-center flex-col'>
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
        <div className="travallerBox flex flex-col w-[70%] my-8">
            <h2 className='text-black'>
              Travallers Details
            </h2>
            <div className="travallersInfo rounded-2xl px-6 py-4 border shadow hover:shadow-lg">
              
                <div className='gender w-[30%] mx-7' id='gender'>
                  <div className='flex flex-col items-start'>
                    <label className='text-black text-left' htmlFor='gender'>
                      Gender
                    </label>
                    <div className="options flex justify-between w-full">
                      <div className='flex items-center'>
                        <input type="radio" id="male" name='gender' value='MALE'/>
                        <label for="male">Male</label>
                      </div>
                      <div className='flex items-center'>
                        <input type="radio" id="female" name='gender' value='FEMALE'/>
                        <label for="female">Female</label>
                      </div>
                      <div className='flex items-center'  >
                        <input type="radio" id="transgender" name='gender' value='TRANSGENDER'/>
                        <label for="transgender">Transgender</label>
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
                <div className="name grid grid-cols-3 gap-2 my-5">
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="name" className='text-xs text-gray-500 text-left'>Name</label>
                    <input type="text" id='name' value={user.name} className='boder border-b-2 bg-transparent' />
                  </div>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="age" className='text-xs text-gray-500 text-left'>Age</label>
                    <input type="number" name="age" id="age" value={age} className='boder border-b-2 bg-transparent'/>
                  </div>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="berth" className='text-xs text-gray-500 text-left'>Berth Preference</label>
                    <select name="berth" id="berth" className='boder border-b-2 bg-transparent'>
                      <option value="Lower-berth">Lower berth</option>
                      <option value="Middle-berth">Middle berth</option>
                      <option value="Upper-berth">Upper berth</option>
                      <option value="Side-lower-berth">Side lower berth</option>
                      <option value="Side-upper-berth">Side upper berth</option>
                    </select>
                  </div>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="berth" className='text-xs text-gray-500 text-left'>Class</label>
                    <select name="berth" id="berth" className='boder border-b-2 bg-transparent' value={seatClass} onChange={(e)=>{setSeatClass(e.target.value)}}>
                      <option value="1AC">1AC</option>
                      <option value="2AC">2AC</option>
                      <option value="3AC">3AC</option>
                      <option value="Sleeper">Sleeper</option>
                      <option value="Genral">Genral</option>
                    </select>
                  </div>
                </div>
                <div className="contacts flex my-5 pt-5">
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="mobileNumber" className='text-xs text-gray-500 text-left'>Enter Mobile Number</label>
                    <input type="number" value={user.phone} className='boder border-b-2 bg-transparent'/>
                  </div>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="email" className='text-xs text-gray-500 text-left'>Enter Email</label>
                    <input type="email" value={user.email} className='boder border-b-2 bg-transparent'/>
                  </div>
                </div>
            </div>
        </div>
        <div className='addTravller my-5 w-[70%] '>
          <div className='innerAddTravller rounded-2xl w-full border shadow py-5'>
            <button className='bg-blue-600 hover:bg-blue-900 text-white hover:text-white ' onClick={()=>{setAddTravller(!addTravller)}} >
              {addTravller? "Remove Travller" : "Add Travller"}
            </button>
            <div id='gender' className={`gender w-[30%] mx-7 ${addTravller? '':"hidden"}`}>
                  <div className='flex flex-col items-start'>
                    <label className='text-black text-left' htmlFor='gender'>
                      Gender
                    </label>
                    <div className="options flex justify-between w-full">
                      <div className='flex items-center'>
                        <input type="radio" id="male" name='gender' value='MALE'/>
                        <label for="male">Male</label>
                      </div>
                      <div className='flex items-center'>
                        <input type="radio" id="female" name='gender' value='FEMALE'/>
                        <label for="female">Female</label>
                      </div>
                      <div className='flex items-center'  >
                        <input type="radio" id="transgender" name='gender' value='TRANSGENDER'/>
                        <label for="transgender">Transgender</label>
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
                <div className={`name grid grid-cols-3 gap-2 my-5 ${addTravller? '':"hidden"}`}>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="name" className='text-xs text-gray-500 text-left'>Name</label>
                    <input type="text" id='name' value={newTravaller.name} className='boder border-b-2 bg-transparent' name='name' onChange={handleChange}/>
                  </div>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="age" className='text-xs text-gray-500 text-left'>Age</label>
                    <input type="number" name="age" id="age" value={newTravaller.age} className='boder border-b-2 bg-transparent' onChange={handleChange}/>
                  </div>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="berth" className='text-xs text-gray-500 text-left'>Berth Preference</label>
                    <select name="berth" id="berth" className='boder border-b-2 bg-transparent'>
                      <option value="Lower-berth">Lower berth</option>
                      <option value="Middle-berth">Middle berth</option>
                      <option value="Upper-berth">Upper berth</option>
                      <option value="Side-lower-berth">Side lower berth</option>
                      <option value="Side-upper-berth">Side upper berth</option>
                    </select>
                  </div>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="berth" className='text-xs text-gray-500 text-left'>Class</label>
                    <select name="berth" id="berth" className='boder border-b-2 bg-transparent' value={seatClass} onChange={(e) => setSeatClass(e.target.value)}>
                      <option value="1A">1A</option>
                      <option value="2A">2A</option>
                      <option value="3A">3A</option>
                      <option value="Sleeper">Sleeper</option>
                      <option value="Genral">Genral</option>
                    </select>
                  </div>
                </div>
                <div className={`contacts flex my-5 pt-5 ${addTravller? '':"hidden"}`}>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="mobileNumber" className='text-xs text-gray-500 text-left'>Enter Mobile Number</label>
                    <input type="number" value={newTravaller.phone} className='boder border-b-2 bg-transparent' name='phone' onChange={handleChange}/>
                  </div>
                  <div className='flex flex-col mx-8'>
                    <label htmlFor="email" className='text-xs text-gray-500 text-left' >Enter Email</label>
                    <input type="email" value={newTravaller.email} name='email' className='boder border-b-2 bg-transparent' onChange={handleChange}/>
                  </div>
                </div>
          </div >
        </div>
        <div>
          <button className='bg-blue-600 hover:bg-blue-900 text-white hover:text-white ' onClick={handleSubmit}>
            Proceed 
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookTicket