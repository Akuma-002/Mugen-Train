import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserInfo';
import axios from 'axios';

// ✅ Backend base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/users';

// Dynamic import for react-qr-code
const useQRCode = () => {
  const [QRCodeComponent, setQRCodeComponent] = useState(null);
  useEffect(() => {
    let mounted = true;
    import('react-qr-code').then((m) => {
      if (mounted) setQRCodeComponent(m.default || m);
    })
    .catch(() => {});
    return () => { mounted = false; };
  }, []);
  return QRCodeComponent;
};

const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const QRCodeComponent = useQRCode();
  const [showJson, setShowJson] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const booking = (user?.bookings || []).find((b) => b.ticketNumber === id);

  if (!booking) {
    return (
      <div className="min-h-[60vh] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex flex-col items-center justify-center px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket not found</h2>
        <p className="text-lg text-gray-600">
          We couldn't find a ticket with ID: <strong>{id}</strong>
        </p>
        <button
          className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-700 transition"
          onClick={() => navigate('/my-bookings')}
        >
          Back to bookings
        </button>
      </div>
    );
  }

  const handlePrint = () => window.print();

  const handleCancel = async (ticketNumber) => {
    if (!ticketNumber) return;
    setProcessing(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert("You need to be logged in to cancel bookings. Redirecting to login...");
        navigate('/login');
        return;
      }
      const userId = user?._id || user?.id;
      if (!userId) {
        setError("User information missing. Please login again.");
        return;
      }
      const res = await axios.put(
        `${API_URL}/${userId}/cancel/${ticketNumber}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setUser(prev => ({ ...prev, bookings: res.data.updatedBookings }));
    } catch (err) {
      setError(err.response?.data?.message || "Error cancelling booking");
    } finally {
      setProcessing(false);
    }
  };

  const buildPayload = (booking, user) => {
    if (!booking || !user) return null;
    try {
      return JSON.stringify({
        ticketNumber: booking.ticketNumber,
        trainName: booking.trainName,
        trainNumber: booking.trainNumber,
        travelDate: booking.travelDate,
        time: booking.time,
        originStation: booking.originStation,
        destinationStation: booking.destinationStation,
        seats: booking.seatNumbers || [],
        class: booking.class,
        fare: booking.totalFare,
        status: booking.status,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        issuedAt: new Date().toISOString(),
      }, null, 2);
    } catch {
      return null;
    }
  };

  const qrValue = buildPayload(booking, user);

  return (
    <>
    <div className='h-20'></div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 py-12 px-5 print:bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl shadow-2xl bg-white/70 backdrop-blur-lg p-8 border border-gray-200 print:shadow-none print:border print:p-2">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
            <div>
              <div className="text-2xl font-bold text-blue-800">{booking.trainName} <span className="text-xs text-blue-400/75">({booking.trainNumber})</span></div>
              <div className="text-sm text-gray-500">Ticket: <span className="font-semibold">{booking.ticketNumber}</span></div>
            </div>
            <div className="flex gap-2 mt-3 sm:mt-0">
              <button
                className="px-5 py-2 bg-indigo-500 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                onClick={() => navigate('/my-bookings')}
              >
                Back
              </button>
              <button
                className="px-5 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-700 transition"
                onClick={handlePrint}
              >
                Print
              </button>
              {(booking.status !== 'completed' && booking.status !== 'cancelled') && (
                <button
                  className="px-5 py-2 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-700 transition"
                  onClick={() => handleCancel(booking.ticketNumber)}
                  disabled={processing}
                >
                  {processing ? 'Cancelling…' : 'Cancel'}
                </button>
              )}
            </div>
          </div>

          {error && <div className="mb-4 text-red-600 bg-red-50 border rounded p-3 font-medium">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1">
            {/* Journey & Passenger Card */}
            <div>
              <div className="rounded-xl bg-gradient-to-tr from-purple-50 via-white to-blue-100 shadow p-5 mb-6 border border-gray-100">
                <div className="font-semibold text-lg text-gray-800 mb-2">Journey Details</div>
                <div className="ticketRow flex justify-between py-1"><div className="font-medium text-gray-500">From</div><div className="text-gray-900">{booking.originStation}</div></div>
                <div className="ticketRow flex justify-between py-1"><div className="font-medium text-gray-500">To</div><div className="text-gray-900">{booking.destinationStation}</div></div>
                <div className="ticketRow flex justify-between py-1"><div className="font-medium text-gray-500">Date</div><div className="text-gray-900">{new Date(booking.travelDate).toLocaleDateString()}</div></div>
                <div className="ticketRow flex justify-between py-1"><div className="font-medium text-gray-500">Time</div><div className="text-gray-900">{booking.time}</div></div>
                <div className="ticketRow flex justify-between py-1"><div className="font-medium text-gray-500">Class</div><div className="text-gray-900">{booking.class}</div></div>
                <div className="ticketRow flex justify-between py-1"><div className="font-medium text-gray-500">Seats</div><div className="text-gray-900">{booking.seatNumbers?.join(', ') || '—'}</div></div>
                <div className="ticketRow flex justify-between py-1"><div className="font-medium text-gray-500">Fare</div><div className="text-gray-900 font-bold">₹{booking.totalFare}</div></div>
                <div className="ticketRow flex justify-between py-1 mb-2"><div className="font-medium text-gray-500">Status</div>
                  <div className={`text-gray-900 font-bold ${booking.status==='cancelled'? 'text-red-500':'text-green-600'}`}>{booking.status}</div>
                </div>
                <div className="font-semibold mb-2 text-gray-700 mt-4">Passenger(s)</div>
                <div className="ml-2 text-sm">
                  {booking.passengers?.length
                    ? booking.passengers.map((p, idx) => (
                        <div key={idx} className="mb-1">{p.name} — {p.age} — {p.gender}</div>
                      ))
                    : <div>{user.name}</div>}
                </div>
              </div>
              <div className="rounded xl bg-gradient-to-tr from-pink-50 via-white to-purple-100 shadow p-5 border border-gray-100">
                <div className="font-semibold text-lg text-gray-800 mb-2">Fare Details</div>
                <div className="ticketRow flex justify-between py-1"><div className="text-gray-500">Base fare</div><div className="font-semibold text-gray-900">₹{booking.totalFare}</div></div>
                <div className="ticketRow flex justify-between py-1"><div className="text-gray-500">Taxes & fees</div><div className="font-semibold text-gray-900">₹0</div></div>
                <div className="ticketRow flex justify-between py-1"><div className="font-semibold text-gray-700">Total</div><div className="font-bold text-green-700">₹{booking.totalFare}</div></div>
              </div>
            </div>
            {/* QR Card */}
            <div className="flex flex-col items-center justify-start">
              <div className="rounded-2xl bg-white/80 shadow p-6 flex flex-col items-center border border-gray-200 mb-4">
                {QRCodeComponent ? (
                  <QRCodeComponent
                    value={qrValue || `${window.location.origin}/ticket/${booking.ticketNumber}`}
                    size={150}
                  />
                ) : (
                  <div className="qrPlaceholder w-36 h-36 flex items-center justify-center text-lg text-gray-400">QR</div>
                )}
                <div className="mt-3 text-xs text-gray-500 font-medium">Scan to view ticket details</div>
                <button
                  className="mt-4 px-4 py-2 bg-gray-100 text-gray-600 rounded font-semibold hover:bg-gray-200 transition"
                  onClick={() => setShowJson((s) => !s)}
                >
                  {showJson ? 'Hide JSON' : 'Show JSON'}
                </button>
                {showJson && (
                  <pre className="mt-3 max-w-xs overflow-auto bg-gray-100 p-3 rounded text-xs">
                    {qrValue || '—'}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Ticket;
