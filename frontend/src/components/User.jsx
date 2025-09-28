import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './context/LoginInfo';
import { UserContext } from './context/UserInfo';

const User = () => {

  // Context assignments must come first
  const { login } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Separate bookings by travelDate
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight
  const upcomingBookings = user?.bookings?.filter(
    (b) => new Date(b.travelDate) >= today
  ) || [];
  const historyBookings = user?.bookings?.filter(
    (b) => new Date(b.travelDate) < today
  ) || [];

  // Notification for upcoming trips within 7 days
  let notificationBanner = null;
  if (login) {
    const now = new Date();
    const soonTrips = upcomingBookings.filter(b => {
      const travelDate = new Date(b.travelDate);
      const diffDays = (travelDate - now) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    });
    if (soonTrips.length > 0) {
      notificationBanner = (
        <div className="w-full flex justify-center mb-2">
          <div className="bg-yellow-100 text-yellow-800 px-6 py-2 rounded-xl shadow font-semibold">
            You have {soonTrips.length} upcoming trip{soonTrips.length > 1 ? 's' : ''} in the next 7 days!
          </div>
        </div>
      );
    }
  }

    // ...existing code...

  useEffect(() => {
    if (!login) navigate("/login");
  }, [login, navigate]);
  console.log(user);
  return (
    <>
      {login && notificationBanner}
      {login && (
        <div className="userMainBox p-6 mx-auto my-2 space-y-6">
          {/* Summary Card */}
          <div className="w-full flex justify-center mb-4">
            <div className="flex gap-6 bg-slate-800 rounded-xl shadow-lg px-8 py-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{user?.bookings?.length || 0}</div>
                <div className="text-sm text-gray-300">Total Trips</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">{upcomingBookings.length}</div>
                <div className="text-sm text-gray-300">Upcoming</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">{
                  user?.bookings?.filter(b =>
                    typeof b.status === 'string' &&
                    b.status.toLowerCase().includes('cancel')
                  ).length
                }</div>
                <div className="text-sm text-gray-300">Cancelled</div>
              </div>
            </div>
          </div>
          <div className="userInfoBox w-full bg-slate-700 p-4 rounded-xl flex items-center space-x-4">
            
            {/* Avatar */}
            <div className="avatar w-20 h-20 flex items-center justify-center border rounded-full bg-black text-white text-4xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* User Details */}
            <div className="userDetails">
              <h2 className="text-2xl font-semibold">{user?.name || "Unnamed User"}</h2>
              <p className="text-sm text-gray-200">{user?.email || "No Email Provided"}</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold border border-green-300">Wallet: ₹{user?.walletBalance?.toFixed(2) || "0.00"}</span>
                <button className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-primary/80 transition duration-300">Top Up</button>
              </div>
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
                  <h3 className="text-xl font-semibold mb-4 text-primary">Your Upcoming Trips</h3>
                  <div className="w-full rounded-2xl shadow-xl p-4 bg-slate-700">
                    <table className="w-full rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-primary text-white sticky top-0 z-10 shadow-md">
                          <th className='px-4 py-2'>Train Name</th>
                          <th className='px-4 py-2'>Train Number</th>
                          <th className="px-4 py-2">From</th>
                          <th className="px-4 py-2">To</th>
                          <th className='px-4 py-2'>Diparture Date</th>
                          <th className="px-4 py-2">Seat(s)</th>
                          <th className="px-4 py-2">Class</th>
                          <th className="px-4 py-2">Fare</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingBookings.length > 0 ? (
                          [...upcomingBookings]
                            .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
                            .map((booking, idx) => (
                              <tr key={booking._id} className={idx % 2 === 0 ? "bg-slate-600" : "bg-slate-700 hover:bg-slate-800 transition"}>
                                <td className="px-4 py-2 flex items-center gap-2">
                                  <span className="flex w-6 h-6 bg-slate-900 rounded-full items-center justify-center">
                                    {/* Train SVG icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" />
                                      <circle cx="8.5" cy="16.5" r="1.5" fill="currentColor" />
                                      <circle cx="15.5" cy="16.5" r="1.5" fill="currentColor" />
                                    </svg>
                                  </span>
                                  <span>{booking.trainName || "N/A"}</span>
                                </td>
                                <td className="px-4 py-2">{booking.trainNumber || "N/A"}</td>
                                <td className="px-4 py-2">{booking.originStation || "N/A"}</td>
                                <td className="px-4 py-2">{booking.destinationStation || "N/A"}</td>
                                <td className="px-4 py-2">{new Date(booking.travelDate).toLocaleDateString() || "N/A"}</td>
                                <td className="px-4 py-2">{Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(", ") : booking.seatNumbers || "N/A"}</td>
                                <td className="px-4 py-2">{booking.class || "N/A"}</td>
                                <td className="px-4 py-2">{booking.totalFare ? `₹${booking.totalFare}` : "N/A"}</td>
                                <td className="px-4 py-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-bold cursor-help ${booking.status === "Confirmed" ? "bg-green-500 text-white" : booking.status === "Cancelled" ? "bg-red-500 text-white" : "bg-yellow-500 text-black"}`}
                                    title={
                                      booking.status === "Confirmed"
                                        ? "Your booking is confirmed."
                                        : booking.status === "Cancelled"
                                        ? "This booking was cancelled."
                                        : booking.status === "Pending"
                                        ? "Your booking is pending confirmation."
                                        : "Status unknown."
                                    }
                                  >
                                    {booking.status || "N/A"}
                                  </span>
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-600 transition" title="Cancel Booking">Cancel</button>
                                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-600 transition" title="View Ticket">View Ticket</button>
                                  <button className="bg-gray-500 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-600 transition focus:outline-none" title="Download PDF">PDF</button>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td className="px-4 py-2 text-center" colSpan="8">No upcoming trips found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {activeTab === "history" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-secondary">Your Booking History</h3>
                  <div className="w-full rounded-lg shadow-lg">
                    <table className="w-full bg-slate-800 rounded-lg">
                      <thead>
                        <tr className="bg-secondary text-white">
                          <th className='px-4 py-2'>Train Name</th>
                          <th className='px-4 py-2'>Train Number</th>
                          <th className="px-4 py-2">From</th>
                          <th className="px-4 py-2">To</th>
                          <th className='px-4 py-2'>Diparture Date</th>
                          <th className="px-4 py-2">Seat(s)</th>
                          <th className="px-4 py-2">Class</th>
                          <th className="px-4 py-2">Fare</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyBookings.length > 0 ? (
                          [...historyBookings]
                            .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
                            .map((booking, idx) => (
                              <tr key={booking._id} className={idx % 2 === 0 ? "bg-slate-700" : "bg-slate-600 hover:bg-slate-500 transition"}>
                                <td className="px-4 py-2 flex items-center gap-2">
                                  <span className="flex w-6 h-6 bg-slate-900 rounded-full items-center justify-center">
                                    {/* Train SVG icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-secondary">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" />
                                      <circle cx="8.5" cy="16.5" r="1.5" fill="currentColor" />
                                      <circle cx="15.5" cy="16.5" r="1.5" fill="currentColor" />
                                    </svg>
                                  </span>
                                  <span>{booking.trainName || "N/A"}</span>
                                </td>
                                <td className="px-4 py-2">{booking.trainNumber || "N/A"}</td>
                                <td className="px-4 py-2">{booking.originStation || "N/A"}</td>
                                <td className="px-4 py-2">{booking.destinationStation || "N/A"}</td>
                                <td className="px-4 py-2">{new Date(booking.travelDate).toLocaleDateString() || "N/A"}</td>
                                <td className="px-4 py-2">{Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(", ") : booking.seatNumbers || "N/A"}</td>
                                <td className="px-4 py-2">{booking.class || "N/A"}</td>
                                <td className="px-4 py-2">{booking.totalFare ? `₹${booking.totalFare}` : "N/A"}</td>
                                <td className="px-4 py-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-bold cursor-help ${booking.status === "Confirmed" ? "bg-green-500 text-white" : booking.status === "Cancelled" ? "bg-red-500 text-white" : "bg-yellow-500 text-black"}`}
                                    title={
                                      booking.status === "Confirmed"
                                        ? "Your booking is confirmed."
                                        : booking.status === "Cancelled"
                                        ? "This booking was cancelled."
                                        : booking.status === "Pending"
                                        ? "Your booking is pending confirmation."
                                        : "Status unknown."
                                    }
                                  >
                                    {booking.status || "N/A"}
                                  </span>
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                  <button className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition" title="Cancel Booking">Cancel</button>
                                  <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition" title="View Ticket">View Ticket</button>
                                  <button className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition" title="Download PDF">PDF</button>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td className="px-4 py-2 text-center" colSpan="8">No booking history found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
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
