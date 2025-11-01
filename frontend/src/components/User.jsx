import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './context/LoginInfo';
import { UserContext } from './context/UserInfo';

const User = () => {
  const { login } = useContext(LoginContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Separate bookings by travelDate
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingBookings = user?.bookings?.filter(
    (b) => new Date(b.travelDate) >= today
  ) || [];
  const historyBookings = user?.bookings?.filter(
    (b) => new Date(b.travelDate) < today
  ) || [];
  const handleView = (ticketNumber) => {
    navigate(`/ticket/${ticketNumber}`)
  }
  const handlePrint = () => window.print();
  // Notification for upcoming trips within 7 days
  let notificationBanner = null;
  if (login) {
    const now = new Date();
    const soonTrips = upcomingBookings.filter((b) => {
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

  useEffect(() => {
    if (!login) navigate('/login');
  }, [login, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {login && notificationBanner && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="animate-bounce bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl shadow-2xl font-semibold backdrop-blur-sm border border-yellow-300/20">
            {notificationBanner}
          </div>
        </div>
      )}
      {login && (
        <>
          <div className="h-[6rem]" />
          <div className="userMainBox p-4 sm:p-6 md:p-8 mx-auto my-2 space-y-8 max-w-7xl">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="stat-card bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm shadow-xl hover:shadow-blue-500/10 transition-all duration-500 group">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 font-medium">Total Trips</h3>
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold text-white mt-4 mb-2">{user?.bookings?.length || 0}</p>
                <div className="text-sm text-gray-400">Lifetime bookings</div>
              </div>

              {/* Upcoming Trips Stat Card */}
              <div className="stat-card bg-gradient-to-br from-green-500/10 to-green-600/10 p-6 rounded-2xl border border-green-500/20 backdrop-blur-sm shadow-xl hover:shadow-green-500/10 transition-all duration-500 group">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 font-medium">Upcoming Trips</h3>
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11h-2v-2h2v2zm0-4h-2V7h2v2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold text-white mt-4 mb-2">{upcomingBookings.length}</p>
                <div className="text-sm text-gray-400">Trips in the next 7 days</div>
              </div>

              {/* Cancelled Trips Stat Card */}
              <div className="stat-card bg-gradient-to-br from-red-500/10 to-red-600/10 p-6 rounded-2xl border border-red-500/20 backdrop-blur-sm shadow-xl hover:shadow-red-500/10 transition-all duration-500 group">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 font-medium">Cancelled Trips</h3>
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11h-2v-2h2v2zm0-4h-2V7h2v2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold text-white mt-4 mb-2">
                  {user?.bookings?.filter(b => typeof b.status === 'string' && b.status.toLowerCase().includes('cancel')).length || 0}
                </p>
                <div className="text-sm text-gray-400">Cancelled bookings</div>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="profile-card bg-gradient-to-br from-slate-800 to-slate-900/50 rounded-3xl p-8 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative">
                  <div className="avatar w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white shadow-xl border-4 border-slate-700/50 transform hover:scale-105 transition-all duration-300">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-800"></div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {user?.name || 'Unnamed User'}
                  </h2>
                  <p className="text-gray-400 mt-2">{user?.email || 'No Email Provided'}</p>
                  <div className="flex flex-wrap gap-4 mt-6 justify-center sm:justify-start">
                    <button onClick={() => navigate('/edit-profile')} 
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:from-primary/80 hover:to-purple-600/80 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/20">
                      Edit Profile
                    </button>
                    <button onClick={() => { localStorage.clear(); window.location.reload(); }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="tabs-container bg-gradient-to-br from-slate-800 to-slate-900/50 rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-sm overflow-hidden">
              <div className="tabs flex flex-wrap gap-2 p-4 border-b border-slate-700/50">
                <button
                  className={`px-6 py-3 rounded-t-xl font-medium transition-all duration-300 ${
                    activeTab === 'upcoming' 
                      ? 'bg-white text-black transform translate-y-[2px] shadow-lg' 
                      : 'text-gray-300 hover:bg-slate-600/50'
                  }`}
                  onClick={() => setActiveTab('upcoming')}
                  role="tab"
                  aria-selected={activeTab === 'upcoming'}
                  aria-current={activeTab === 'upcoming' ? 'page' : undefined}
                  tabIndex={activeTab === 'upcoming' ? 0 : -1}
                  id="tab-upcoming"
                  aria-controls="tabpanel-upcoming"
                >
                  Upcoming Trips
                </button>
                <button
                  className={`px-6 py-3 rounded-t-xl font-medium transition-all duration-300 ${
                    activeTab === 'history' 
                      ? 'bg-white text-black transform translate-y-[2px] shadow-lg' 
                      : 'text-gray-300 hover:bg-slate-600/50'
                  }`}
                  onClick={() => setActiveTab('history')}
                  role="tab"
                  aria-selected={activeTab === 'history'}
                  aria-current={activeTab === 'history' ? 'page' : undefined}
                  tabIndex={activeTab === 'history' ? 0 : -1}
                  id="tab-history"
                  aria-controls="tabpanel-history"
                >
                  Booking History
                </button>
                <button
                  className={`px-6 py-3 rounded-t-xl font-medium transition-all duration-300 ${
                    activeTab === 'settings' 
                      ? 'bg-white text-black transform translate-y-[2px] shadow-lg' 
                      : 'text-gray-300 hover:bg-slate-600/50'
                  }`}
                  onClick={() => setActiveTab('settings')}
                  role="tab"
                  aria-selected={activeTab === 'settings'}
                  aria-current={activeTab === 'settings' ? 'page' : undefined}
                  tabIndex={activeTab === 'settings' ? 0 : -1}
                  id="tab-settings"
                  aria-controls="tabpanel-settings"
                >
                  Settings
                </button>
              </div>
              
              <div className="p-6">
                {/* ...existing tab content with updated table styles... */}
                {/* Add glass-morphism and hover effects to tables */}
                {/* Upcoming Trips Tab */}
                {activeTab === 'upcoming' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Your Upcoming Trips</h3>
                    <div className="w-full rounded-2xl shadow-xl p-2 sm:p-4 bg-slate-700 overflow-x-auto">
                      <table className="min-w-[600px] w-full rounded-xl overflow-hidden text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-primary text-white sticky top-0 z-10 shadow-md">
                            <th className="px-4 py-2" scope="col">Train Name</th>
                            <th className="px-4 py-2" scope="col">Train Number</th>
                            <th className="px-4 py-2" scope="col">From</th>
                            <th className="px-4 py-2" scope="col">To</th>
                            <th className="px-4 py-2" scope="col">Diparture Date</th>
                            <th className="px-4 py-2" scope="col">Seat(s)</th>
                            <th className="px-4 py-2" scope="col">Class</th>
                            <th className="px-4 py-2" scope="col">Fare</th>
                            <th className="px-4 py-2" scope="col">Status</th>
                            <th className="px-4 py-2" scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upcomingBookings.length > 0 ? (
                            [...upcomingBookings]
                              .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
                              .map((booking, idx) => (
                                <tr key={booking._id} className={idx % 2 === 0 ? 'bg-slate-600' : 'bg-slate-700 hover:bg-slate-800 transition'}>
                                  <td className="px-4 py-2 flex items-center gap-2">
                                    <span className="flex w-6 h-6 bg-slate-900 rounded-full items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-primary">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 17V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" />
                                        <circle cx="8.5" cy="16.5" r="1.5" fill="currentColor" />
                                        <circle cx="15.5" cy="16.5" r="1.5" fill="currentColor" />
                                      </svg>
                                    </span>
                                    <span>{booking.trainName || 'N/A'}</span>
                                  </td>
                                  <td className="px-4 py-2">{booking.trainNumber || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.originStation || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.destinationStation || 'N/A'}</td>
                                  <td className="px-4 py-2">{new Date(booking.travelDate).toLocaleDateString() || 'N/A'}</td>
                                  <td className="px-4 py-2">{Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(', ') : booking.seatNumbers || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.class || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.totalFare ? `₹${booking.totalFare}` : 'N/A'}</td>
                                  <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${booking.status?.toLowerCase() === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`}>
                                      {booking.status || 'N/A'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 flex gap-2">
                                    
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition" title="View Ticket" onClick={() => handleView(booking.ticketNumber)}>
                                      View Ticket
                                    </button>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan={10} className="text-center py-4 text-gray-400">No upcoming trips</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Booking History Tab */}
                {activeTab === 'history' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Booking History</h3>
                    <div className="w-full rounded-2xl shadow-xl p-2 sm:p-4 bg-slate-700 overflow-x-auto">
                      <table className="min-w-[600px] w-full rounded-xl overflow-hidden text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-primary text-white sticky top-0 z-10 shadow-md">
                            <th className="px-4 py-2">Train Name</th>
                            <th className="px-4 py-2">Train Number</th>
                            <th className="px-4 py-2">From</th>
                            <th className="px-4 py-2">To</th>
                            <th className="px-4 py-2">Diparture Date</th>
                            <th className="px-4 py-2">Seat(s)</th>
                            <th className="px-4 py-2">Class</th>
                            <th className="px-4 py-2">Fare</th>
                            <th className="px-4 py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {historyBookings.length > 0 ? (
                            [...historyBookings]
                              .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
                              .map((booking, idx) => (
                                <tr key={booking._id} className={idx % 2 === 0 ? 'bg-slate-600' : 'bg-slate-700 hover:bg-slate-800 transition'}>
                                  <td className="px-4 py-2">{booking.trainName || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.trainNumber || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.originStation || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.destinationStation || 'N/A'}</td>
                                  <td className="px-4 py-2">{new Date(booking.travelDate).toLocaleDateString() || 'N/A'}</td>
                                  <td className="px-4 py-2">{Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(', ') : booking.seatNumbers || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.class || 'N/A'}</td>
                                  <td className="px-4 py-2">{booking.totalFare ? `₹${booking.totalFare}` : 'N/A'}</td>
                                  <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${booking.status?.toLowerCase() === 'cancelled' ? 'bg-red-500' : 'bg-green-500'}`}>
                                      {booking.status || 'N/A'}
                                    </span>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan={9} className="text-center py-4 text-gray-400">No history bookings</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="p-2 sm:p-4">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Account Settings</h3>
                    <div className="space-y-2 text-gray-300">
                      <p><strong>Name:</strong> {user?.name}</p>
                      <p><strong>Email:</strong> {user?.email}</p>
                      <p><strong>Wallet Balance:</strong> ₹{user?.walletBalance?.toFixed(2) || '0.00'}</p>
                    </div>
                    <button
                      onClick={() => navigate('/edit-profile')}
                      className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition duration-300"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
