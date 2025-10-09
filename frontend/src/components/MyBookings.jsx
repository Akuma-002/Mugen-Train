import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/UserInfo'
import { Button } from './ui/Button'
import Spinner from './ui/Spinner'

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
  const [confirming, setConfirming] = useState(null)
  const [undoInfo, setUndoInfo] = useState(null)
  const undoTimer = useRef(null)

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

  const confirmCancel = async (ticketNumber) => {
    // Optimistic update
    const prev = user.bookings || []
    const updated = prev.map((b) => (b.ticketNumber === ticketNumber ? { ...b, status: 'cancelled' } : b))
    setUser({ ...user, bookings: updated })
    setConfirming(null)

    // Show undo option
    setUndoInfo({ ticketNumber, message: `Cancelled ${ticketNumber}` })
    if (undoTimer.current) clearTimeout(undoTimer.current)
    undoTimer.current = setTimeout(() => {
      // After undo window, call API to persist cancellation
      persistCancel(ticketNumber).catch(() => {
        // If persist fails, rollback
        setUser({ ...user, bookings: prev })
        setError('Could not cancel booking on server. Changes rolled back.')
      })
      setUndoInfo(null)
    }, 5000)
  }

  const undoCancel = () => {
    if (!undoInfo) return
    const { ticketNumber } = undoInfo
    const prev = user.bookings || []
    // restore the booking status back to previous (assume it was not cancelled)
    const restored = prev.map((b) => (b.ticketNumber === ticketNumber ? { ...b, status: 'confirmed' } : b))
    setUser({ ...user, bookings: restored })
    setUndoInfo(null)
    if (undoTimer.current) {
      clearTimeout(undoTimer.current)
      undoTimer.current = null
    }
  }

  const persistCancel = async (ticketNumber) => {
    // Use configured API base if present
    const API_URL = import.meta.env.VITE_SERVER_API || ''
    const url = `${API_URL}/bookings/${ticketNumber}/cancel`
    const token = localStorage.getItem('authToken')
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {}
    const resp = await fetch(url, { method: 'POST', headers })
    if (!resp.ok) throw new Error('persist failed')
    return true
  }

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl mb-4">My Bookings</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Spinner size={32} />
          <div>Loading bookings...</div>
        </div>
      </div>
    )
  }

  const bookings = user?.bookings || []

  return (
    <div className="myBookingBox p-6 mt-5">
      <h2 className="text-4xl mb-4">My Bookings</h2>

      {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
      {bookings.length === 0 ? (
        <div className="noBookings p-6" style={{ textAlign: 'left' }}>
          <h3 style={{ marginTop: 0 }}>No bookings yet</h3>
          <p className="text-sm text-muted">Search trains and book your first ticket to see it here.</p>
          <div style={{ marginTop: 12 }}>
            <Button onClick={() => navigate('/')} aria-label="Search trains">Search trains</Button>
          </div>
        </div>
      ) : (
        <div className='allBookings' style={{ display: 'grid', gap: 12 }}>
          {bookings.map((b) => (
            <div
              key={b.ticketNumber}
              className='bookingsBox'
              tabIndex={0}
              role="button"
              onClick={() => handleView(b.ticketNumber)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleView(b.ticketNumber) }}
              aria-label={`Open booking ${b.ticketNumber}`}
            >
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

              <div className='bookingActions' onClick={(e) => e.stopPropagation()}>
                <div className='fareStatus' >
                  <div style={{ fontWeight: 600 }}>₹{b.totalFare}</div>
                  <div style={{ fontSize: 13, color: b.status === 'cancelled' ? 'crimson' : '#6b7280' }}>{b.status}</div>
                </div>

                {b.status !== 'cancelled' ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    {/* <Button className="text-white" onClick={() => handleView(b.ticketNumber)} aria-label={`View ${b.ticketNumber}`}>View</Button> */}
                    {confirming === b.ticketNumber ? (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Button onClick={() => confirmCancel(b.ticketNumber)} aria-label={`Confirm cancel ${b.ticketNumber}`}>Confirm</Button>
                        <Button onClick={() => setConfirming(null)} aria-label={`Abort cancel ${b.ticketNumber}`}>Abort</Button>
                      </div>
                    ) : (
                      <Button className= {b.status === 'completed' ? "hidden" : "text-white"} onClick={() => setConfirming(b.ticketNumber)} aria-label={`Cancel ${b.ticketNumber}`}>Cancel</Button>
                    )}
                  </div>
                ) : (
                  <div style={{ color: 'crimson', fontSize: 13 }}>Cancelled</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Undo toast */}
      {undoInfo && (
        <div className="undoToast" style={{ position: 'fixed', right: 20, bottom: 20, background: '#111827', color: '#fff', padding: 12, borderRadius: 8 }}>
          <div style={{ marginBottom: 8 }}>{undoInfo.message}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={() => undoCancel()} aria-label="Undo cancel">Undo</Button>
            <Button onClick={() => setUndoInfo(null)} aria-label="Dismiss">Dismiss</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings