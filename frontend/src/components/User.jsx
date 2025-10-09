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
    <>
      {login && notificationBanner}
      {login && (
        <div className="userMainBox p-2 sm:p-4 md:p-6 mx-auto my-2 space-y-6 max-w-full md:max-w-4xl lg:max-w-5xl">
          {/* Summary Card */}
          <div className="w-full flex justify-center mb-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-slate-800 rounded-xl shadow-lg px-4 sm:px-8 py-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{user && user.bookings ? user.bookings.length : 0}</div>
                <div className="text-sm text-gray-300">Total Trips</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">{upcomingBookings.length}</div>
                <div className="text-sm text-gray-300">Upcoming</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {user?.bookings?.filter(b =>
                    typeof b.status === 'string' && b.status.toLowerCase().includes('cancel')
                  ).length || 0}
                </div>
                <div className="text-sm text-gray-300">Cancelled</div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="userInfoBox w-full bg-slate-700 p-2 sm:p-4 rounded-xl flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4" role="region" aria-label="User profile info">
            <div className="avatar w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border rounded-full bg-black text-white text-3xl sm:text-4xl font-bold mb-2 sm:mb-0" aria-label="User avatar" tabIndex={0}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="userDetails flex-1">
              <h2 className="text-lg sm:text-2xl font-semibold" tabIndex={0}>{user?.name || 'Unnamed User'}</h2>
              <p className="text-xs sm:text-sm text-gray-200" tabIndex={0}>{user?.email || 'No Email Provided'}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-green-300" tabIndex={0}>
                  Wallet: ₹{user?.walletBalance?.toFixed(2) || '0.00'}
                </span>
                <button className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium hover:bg-primary/80 transition duration-300" tabIndex={0} aria-label="Top up wallet">Top Up</button>
              </div>
            </div>
            <div className="editProfile flex flex-col sm:flex-row items-center gap-2 sm:ml-auto">
              <button
                onClick={() => navigate('/edit-profile')}
                className="bg-white text-black px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-slate-100 transition duration-300"
                aria-label="Edit Profile"
                tabIndex={0}
              >
                Edit Profile
              </button>
              <button
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-red-700 transition duration-300"
                aria-label="Logout"
                tabIndex={0}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabsBox w-full bg-slate-700 p-4 rounded-xl">
            <div className="tabs flex flex-wrap gap-2 sm:gap-4 border-b border-gray-500/50 mb-4" role="tablist" aria-label="User dashboard tabs">
              <button
                className={`px-4 py-2 rounded-t-lg ${activeTab === 'upcoming' ? 'bg-white text-black font-semibold' : 'text-gray-300 hover:bg-slate-600'}`}
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
                className={`px-4 py-2 rounded-t-lg ${activeTab === 'history' ? 'bg-white text-black font-semibold' : 'text-gray-300 hover:bg-slate-600'}`}
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
                className={`px-4 py-2 rounded-t-lg ${activeTab === 'settings' ? 'bg-white text-black font-semibold' : 'text-gray-300 hover:bg-slate-600'}`}
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

            <div className="tabContent text-gray-200">
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
      )}
    </>
  );
};

export default User;
