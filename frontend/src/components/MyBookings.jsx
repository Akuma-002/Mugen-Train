import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/UserInfo'
import { Button } from './ui/Button'

const formatDate = (iso) => {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch (e) {
    return iso
  }
}

const MyBookings = () => {
  const { user, setUser } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Simulate initial load from context (user.bookings is populated on login)
  useEffect(() => {
    // small timeout to show spinner briefly when navigating
    const t = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => clearTimeout(t)
  }, [])

  const handleCancel = (ticketNumber) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?')
    if (!confirmed) return

    // Local optimistic update: mark booking status as 'cancelled'
    try {
      const updated = (user.bookings || []).map((b) =>
        b.ticketNumber === ticketNumber ? { ...b, status: 'cancelled' } : b
      )
      setUser({ ...user, bookings: updated })
    } catch (err) {
      setError('Could not update booking locally.')
    }
  }

  const navigate = useNavigate()

  const handleView = (ticketNumber) => {
    navigate(`/ticket/${ticketNumber}`)
  }

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl mb-4">My Bookings</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, border: '4px solid #ddd', borderTop: '4px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <div>Loading bookings...</div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  const bookings = user?.bookings || []

  return (
    <div className="myBookingBox p-6 mt-5">
      <h2 className="text-4xl mb-4">My Bookings</h2>

      {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}

      {bookings.length === 0 ? (
        <div>
          <p>You have no bookings yet.</p>
          <p className="text-sm text-muted">Search trains and book your first ticket.</p>
        </div>
      ) : (
        <div className='allBookings' style={{ display: 'grid', gap: 12 }}>
          {bookings.map((b) => (
            <div key={b.ticketNumber} className='bookingsBox' >
              <div className='bookingInfo' >
                <div className='bookingHeader' >
                  <strong>{b.trainName} ({b.trainNumber})</strong>
                  <span style={{ color: '#6b7280' }}>• {b.ticketNumber}</span>
                  <span style={{ color: '#6b7280' }}>{b.class}</span>
                </div>
                <div className='bookingDetails' >
                  <div>{b.originStation} → {b.destinationStation}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>Travel: {formatDate(b.travelDate)} • Time: {b.time}</div>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>Seats: {b.seatNumbers?.join(', ') || '—'}</div>
                </div>
              </div>

              <div className='bookingActions' >
                <div className='fareStatus' >
                  <div style={{ fontWeight: 600 }}>₹{b.totalFare}</div>
                  <div style={{ fontSize: 13, color: b.status === 'cancelled' ? 'crimson' : '#6b7280' }}>{b.status}</div>
                </div>

                {b.status !== 'cancelled' ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button className="text-white" onClick={() => handleView(b.ticketNumber)} aria-label={`View ${b.ticketNumber}`}>View</Button>
                    <Button className="text-white" onClick={() => handleCancel(b.ticketNumber)} aria-label={`Cancel ${b.ticketNumber}`}>Cancel</Button>
                  </div>
                ) : (
                  <div style={{ color: 'crimson', fontSize: 13 }}>Cancelled</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings