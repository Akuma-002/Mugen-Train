import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserInfo';
import '../App.css';
import axios from 'axios';

// ✅ Define your backend base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/users';

// Dynamic import for react-qr-code
const useQRCode = () => {
  const [QRCodeComponent, setQRCodeComponent] = useState(null);
  useEffect(() => {
    let mounted = true;
    import('react-qr-code')
      .then((m) => {
        if (mounted) setQRCodeComponent(m.default || m);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
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
      <div style={{ padding: 24 }}>
        <h2>Ticket not found</h2>
        <p>
          We couldn't find a ticket with ID: <strong>{id}</strong>
        </p>
        <button className="btn" onClick={() => navigate('/my-bookings')}>
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

    // Debug logs
    console.log('Cancel token:', token);
    console.log('Cancel userId:', userId);

    const res = await axios.put(
      `${API_URL}/${userId}/cancel/${ticketNumber}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);
    setUser(prev => ({ ...prev, bookings: res.data.updatedBookings }));
  } catch (err) {
    console.error("Cancel Error:", err.response?.data || err.message);
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
      });
    } catch {
      return null;
    }
  };

  const qrValue = buildPayload(booking, user);

  return (
    <>
    <div className='h-20'></div>
    <div className='h-10'></div>
    <div className="ticketBox printFriendly">
      <div className="ticketHeader">
        <div>
          <div className="ticketTitle">
            {booking.trainName} <span className="mutedSmall">({booking.trainNumber})</span>
          </div>
          <div className="ticketSubtitle">Ticket: {booking.ticketNumber}</div>
        </div>
        <div className="ticketActions">
          <button className="btn" onClick={() => navigate('/my-bookings')}>
            Back
          </button>
          <button className="btn" onClick={handlePrint}>
            Print
          </button>
          <button className={((booking.status === 'completed')||(booking.status === 'cancelled'))? "hidden": "btn"} onClick={()=>{handleCancel(booking.ticketNumber)}} disabled={processing}>
            {processing ? 'Cancelling…' : 'Cancel'}
          </button>
        </div>
      </div>

      {error && <div className="errorBox">{error}</div>}

      <div className="ticketGrid">
        <div>
          <div className="journeyCard">
            <div className="ticketInfo">
              <div>
                <div className="ticketRow"><div>From</div><div>{booking.originStation}</div></div>
                <div className="ticketRow"><div>To</div><div>{booking.destinationStation}</div></div>
                <div className="ticketRow"><div>Travel Date</div><div>{new Date(booking.travelDate).toLocaleDateString()}</div></div>
                <div className="ticketRow"><div>Time</div><div>{booking.time}</div></div>
              </div>
              <div>
                <div className="ticketRow"><div>Class</div><div>{booking.class}</div></div>
                <div className="ticketRow"><div>Seats</div><div>{booking.seatNumbers?.join(', ')}</div></div>
                <div className="ticketRow"><div>Fare</div><div>₹{booking.totalFare}</div></div>
                <div className="ticketRow"><div>Status</div><div>{booking.status}</div></div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 600 }}>Passenger(s)</div>
              <div className="passengerList">
                {booking.passengers?.length
                  ? booking.passengers.map((p, idx) => (
                      <div key={idx}>
                        {p.name} — {p.age} — {p.gender}
                      </div>
                    ))
                  : <div>{user.name}</div>}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12 }} className="journeyCard">
            <div style={{ fontWeight: 600 }}>Fare details</div>
            <div className="ticketRow"><div>Base fare</div><div>₹{booking.totalFare}</div></div>
            <div className="ticketRow"><div>Taxes & fees</div><div>₹0</div></div>
            <div className="ticketRow"><div>Total</div><div>₹{booking.totalFare}</div></div>
          </div>
        </div>

        <div>
          <div className="qrCard">
            {QRCodeComponent ? (
              <div style={{ width: 160 }}>
                <QRCodeComponent
                  value={qrValue || `${window.location.origin}/ticket/${booking.ticketNumber}`}
                  size={150}
                />
              </div>
            ) : (
              <div className="qrPlaceholder">QR</div>
            )}
            <div className="mutedSmall">Scan to view ticket details</div>

            <button
              className="btn smallBtn"
              onClick={() => setShowJson((s) => !s)}
              style={{ marginTop: 8 }}
            >
              {showJson ? 'Hide JSON' : 'Show JSON'}
            </button>

            {showJson && <pre className="jsonViewer">{qrValue || '—'}</pre>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Ticket;
