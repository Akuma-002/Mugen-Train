import React, { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './context/UserInfo'
import { Button } from './ui/Button'
import Spinner from './ui/Spinner'
import axios from 'axios'
import { DesignContext } from './context/DesignInfo'
const API_URL = import.meta.env.VITE_SERVER_API || '/api'

const formatDate = (iso) => {
  try {
    const d = new Date(iso)
    return d.toLocaleString()
  } catch {
    return iso
  }
}

const MyBookings = () => {
  const { user, setUser } = useContext(UserContext);
  const {setDesign} = useContext(DesignContext);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirming, setConfirming] = useState(null)
  const [undoInfo, setUndoInfo] = useState(null)
  const undoTimer = useRef(null)
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    // use a valid Tailwind class (e.g. bg-red-500) or a fallback like 'bg-black/70'
    setDesign((prev) => ({ ...prev, navbarColor: "bg-primary", navTextColor: "white" }));
    // stop loading once user context is available
    if (user) setLoading(false);
  }, [setDesign, user]);

  const handleCancel = async (ticketNumber) => {
    if (!ticketNumber) return
    setProcessing(true)
    setError(null)

    const token = localStorage.getItem('authToken')
    if (!token) {
      alert('You need to be logged in to cancel bookings. Redirecting to login...')
      navigate('/login')
      setProcessing(false)
      return
    }

    const userId = user?._id || user?.id
    if (!userId) {
      setError('User information missing. Please login again.')
      setProcessing(false)
      return
    }

    // Optimistic update (keep a copy for rollback)
    const prevBookings = user?.bookings ? [...user.bookings] : []
    const updated = prevBookings.map((b) => (b.ticketNumber === ticketNumber ? { ...b, status: 'cancelled' } : b))
    setUser((u) => ({ ...u, bookings: updated }))
    setConfirming(null)

    try {
      // server endpoint: POST /api/bookings/:ticketNumber/cancel
      const res = await axios.post(
        `${API_URL}/bookings/${ticketNumber}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // if server returns updated bookings array, use it; else keep optimistic
      if (res.data?.updatedBookings) {
        setUser((prevUser) => ({ ...prevUser, bookings: res.data.updatedBookings }))
      }

      setUndoInfo({ ticketNumber, message: `Cancelled ${ticketNumber}` })
      if (undoTimer.current) clearTimeout(undoTimer.current)
      undoTimer.current = setTimeout(() => setUndoInfo(null), 5000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error cancelling booking')
      // Rollback optimistic update
      setUser((prevUser) => ({ ...prevUser, bookings: prevBookings }))
    } finally {
      setProcessing(false)
    }
  }

  const handleView = (ticketNumber) => {
    navigate(`/ticket/${ticketNumber}`)
  }
  
  const undoCancel = () => {
    if (!undoInfo) return
    const { ticketNumber } = undoInfo
    const prev = user.bookings || []
    const restored = prev.map((b) => (b.ticketNumber === ticketNumber ? { ...b, status: 'confirmed' } : b))
    setUser({ ...user, bookings: restored })
    setUndoInfo(null)
    if (undoTimer.current) {
      clearTimeout(undoTimer.current)
      undoTimer.current = null
    }
  }

  if (loading)
    return (
      <div className="p-6">
        <h2 className="text-2xl mb-4">My Bookings</h2>
        <div className="flex gap-3 items-center">
          <Spinner size={32} />
          <div>Loading bookings...</div>
        </div>
      </div>
    )

  const sortedBookings = [...(user?.bookings || [])].sort((a, b) => {
  return new Date(b.travelDate).getTime() - new Date(a.travelDate).getTime() // descending
  })


  return (
    <div className="myBookingBox ">
      <div className='h-20 m-5'></div>
      <h2 className="text-4xl mb-4">My Bookings</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      {sortedBookings.length === 0 ? (
        <div className="noBookings p-6 text-left">
          <h3 className="mt-0">No bookings yet</h3>
          <p className="text-sm text-muted">Search trains and book your first ticket to see it here.</p>
          <div className="mt-3">
            <Button onClick={() => navigate('/')} aria-label="Search trains">
              Search trains
            </Button>
          </div>
        </div>
      ) : (
        <div className="allBookings grid gap-4">
          {sortedBookings.map((b) => (
            <div
              key={b.ticketNumber}
              className="bookingsBox"
              tabIndex={0}
              role="button"
              onClick={() => handleView(b.ticketNumber)}
              onKeyDown={(e) => e.key === 'Enter' && handleView(b.ticketNumber)}
              aria-label={`Open booking ${b.ticketNumber}`}
            >
              <div className="bookingInfo">
                <div className="bookingHeader">
                  <strong>
                    {b.trainName} ({b.trainNumber})
                  </strong>
                  <span className="text-gray-500 ml-2">• {b.ticketNumber}</span>
                  <span className="text-gray-500 ml-2">{b.class}</span>
                </div>
                <div className="bookingDetails">
                  <div>
                    {b.originStation} → {b.destinationStation}
                  </div>
                  <div className="text-xs text-gray-500">
                    Travel: {formatDate(b.travelDate)} • Time: {b.time}
                  </div>
                  <div className="text-xs text-gray-500">Seats: {b.seatNumbers?.join(', ') || '—'}</div>
                </div>
              </div>

              <div className="bookingActions" onClick={(e) => e.stopPropagation()}>
                <div className="fareStatus">
                  <div className="font-semibold">₹{b.totalFare}</div>
                  <div className={`text-xs ${b.status === 'cancelled' ? 'text-red-600' : 'text-gray-500'}`}>{b.status}</div>
                </div>

                {b.status !== 'cancelled' ? (
                  <div className="flex gap-2">
                    <Button
                      className={`text-white ${b.status === 'completed' ? 'hidden' : ''}`}
                      disabled={processing}
                      onClick={() => setConfirming(b.ticketNumber)}
                      aria-label={`Cancel ${b.ticketNumber}`}
                    >
                      Cancel
                    </Button>
                    {confirming === b.ticketNumber && (
                      <div className="flex gap-2">
                        <Button onClick={() => { handleCancel(b.ticketNumber); setConfirming(null) }} disabled={processing} aria-label={`Confirm cancel ${b.ticketNumber}`}>
                          Confirm
                        </Button>
                        <Button onClick={() => setConfirming(null)} disabled={processing} aria-label={`Abort cancel ${b.ticketNumber}`}>
                          Abort
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-red-600 text-xs">Cancelled</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {undoInfo && (
        <div className="undoToast fixed right-5 bottom-5 bg-gray-900 text-white p-3 rounded-md">
          <div className="mb-2">{undoInfo.message}</div>
          <div className="flex gap-2">
            <Button onClick={undoCancel} aria-label="Undo cancel" disabled={processing}>
              Undo
            </Button>
            <Button onClick={() => setUndoInfo(null)} aria-label="Dismiss" disabled={processing}>
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyBookings
