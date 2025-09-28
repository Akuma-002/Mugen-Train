import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './context/LoginInfo';
import { UserContext } from './context/UserInfo';

const User = () => {
  const { login } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (!login) navigate("/login");
  }, [login, navigate]);
  console.log(user);
  return (
    <>
      {login && (
        <div className="userMainBox p-6 max-w-4xl mx-auto my-2 space-y-6">
          <div className="userInfoBox w-full bg-slate-700 p-4 rounded-xl flex items-center space-x-4">
            
            {/* Avatar */}
            <div className="avatar w-20 h-20 flex items-center justify-center border rounded-full bg-black text-white text-4xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* User Details */}
            <div className="userDetails">
              <h2 className="text-2xl font-semibold">{user?.name || "Unnamed User"}</h2>
              <p className="text-sm text-gray-200">{user?.email || "No Email Provided"}</p>
            </div>
            <div className="editProfile ml-auto">
              <button
                onClick={() => navigate('/edit-profile')}  
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
              >
                Edit Profile
              </button>
              <div className="logout inline-block ml-4">
                <button
                  onClick={() => { localStorage.clear(); window.location.reload(); }}
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="tabsBox w-full bg-slate-700 p-4 rounded-xl">    
            <div className="tabs flex space-x-4 border-b border-gray-500/50 mb-4">
              <button
                className={`px-4 py-2 rounded-t-lg ${activeTab === "upcoming" ? "bg-white text-black font-semibold" : "text-gray-300 hover:bg-slate-600"}`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming Trips
              </button>
              <button
                className={`px-4 py-2 rounded-t-lg ${activeTab === "history" ? "bg-white text-black font-semibold" : "text-gray-300 hover:bg-slate-600"}`}
                onClick={() => setActiveTab("history")}
              >
                Booking History
              </button>
                <button
                  onClick={() => {setActiveTab("settings")}}
                  className={`px-4 py-2 rounded-t-lg ${activeTab === "settings" ? "bg-white text-black font-semibold" : "text-gray-300 hover:bg-slate-600"}`}
                >
                  Settings
                </button>
            </div>
            <div className="tabContent text-gray-200">
              {activeTab === "upcoming" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Upcoming Trips</h3>
                  <table>
                    <thead>
                      <tr>
                        {/**Train Name */}
                        <th className='border px-4 py-2'>Train Name</th>
                        {/**Train Number */}
                        <th className='border px-4 py-2'>Train Number</th>
                        {/**Ticket Number */}
                        <th className='border px-4 py-2'>Ticket Number</th>
                        {/**Origin train Station*/}
                        <th className="border px-4 py-2">From</th>
                        {/**Destination train Station*/}
                        <th className="border px-4 py-2">To</th>
                        {/**Booking Date */}
                        <th className="border px-4 py-2">Booking Date</th>
                        {/**Diparture Date */}
                        <th className='border px-4 py-2'>Diparture Date</th>
                        {/**Booking Status */}
                        <th className="border px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    {console.log(user?.bookings)}
                    <tbody>
                      {user?.bookings?.length > 0 ? (
                        [...user.bookings]
                          .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
                          .map((booking) => (
                            <tr key={booking._id}>
                            <td className="border px-4 py-2">{booking.trainName || "N/A"}</td>
                            <td className="border px-4 py-2">{booking.trainNumber || "N/A"}</td>
                            <td className="border px-4 py-2">{booking.ticketNumber || "N/A"}</td>
                            {/**Origin train Station*/}
                            <td className="border px-4 py-2">{booking.originStation || "N/A"}</td>
                            <td className="border px-4 py-2">{booking.destinationStation || "N/A"}</td>
                            <td className="border px-4 py-2">{new Date(booking.bookingDate).toLocaleDateString() || "N/A"}</td>
                            <td className="border px-4 py-2">{new Date(booking.travelDate).toLocaleDateString() || "N/A"}</td>
                            <td className="border px-4 py-2">{booking.status || "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="border px-4 py-2 text-center" colSpan="4">No upcoming trips found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "history" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Your Booking History</h3>
                  <p>No past bookings found. Your booking history will appear here once you start traveling with us!</p>
                </div>
              )}
              {activeTab === "settings" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">User Settings</h3>
                  <p>Settings feature is coming soon! Stay tuned for updates.</p>
                </div>
              )}
            </div>
          </div>
          <div className="supportBox w-full bg-slate-700 p-4 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Need Assistance?</h3>
            <p className="mb-4">Our support team is here to help you with any questions or issues you may have.</p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
            >
              Contact Support
            </button>
          </div> 
        </div>
      )}
    </>
  );
};

export default User;
