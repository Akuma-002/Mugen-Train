import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from './context/UserInfo'
import './Ticket.css'

// Dynamic import for react-qr-code (avoids bundling issues)
const useQRCode = () => {
  const [QRCodeComponent, setQRCodeComponent] = useState(null)
  useEffect(() => {
    let mounted = true
    import('react-qr-code')
      .then((m) => {
        if (mounted) setQRCodeComponent(m.default || m)
      })
      .catch(() => {}) // Ignore missing dependency errors
    return () => { mounted = false }
  }, [])
  return QRCodeComponent
}

const Ticket = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const QRCodeComponent = useQRCode()
  const [showJson, setShowJson] = useState(false)

  const booking = (user?.bookings || []).find(b => b.ticketNumber === id)

  if (!booking) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Ticket not found</h2>
        <p>We couldn't find a ticket with ID: <strong>{id}</strong></p>
        <button className="btn" onClick={() => navigate('/my-bookings')}>Back to bookings</button>
      </div>
    )
  }

  const handlePrint = () => window.print()

  const buildPayload = (booking, user) => {
    if (!booking || !user) return null
    const payload = {
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
      issuedAt: new Date().toISOString()
    }
    try {
      return JSON.stringify(payload)
    } catch {
      return null
    }
  }

  const qrValue = buildPayload(booking, user)

  return (
    <div className="ticketBox printFriendly">
      <div className="ticketHeader">
        <div>
          <div className="ticketTitle">
            {booking.trainName} <span className="mutedSmall">({booking.trainNumber})</span>
          </div>
          <div className="ticketSubtitle">Ticket: {booking.ticketNumber}</div>
        </div>
        <div className="ticketActions">
          <button className="btn" onClick={() => navigate('/my-bookings')}>Back</button>
          <button className="btn" onClick={handlePrint}>Print</button>
        </div>
      </div>

      <div className="ticketGrid">
        {/* Left Section: Journey & Fare Info */}
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
                      <div key={idx}>{p.name} — {p.age} — {p.gender}</div>
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

        {/* Right Section: QR Code */}
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
            
            {showJson && <pre className="jsonViewer">{qrValue || '—'}</pre>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
