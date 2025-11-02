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
  const { user, setUser } = useContext(UserContext)
  const { setDesign } = useContext(DesignContext)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirming, setConfirming] = useState(null)
  const [undoInfo, setUndoInfo] = useState(null)
  const undoTimer = useRef(null)
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setDesign((prev) => ({ ...prev, navbarColor: "bg-primary", navTextColor: "white" }))
    if (user) setLoading(false)
  }, [setDesign, user])

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
    const prevBookings = user?.bookings ? [...user.bookings] : []
    const updated = prevBookings.map((b) => (b.ticketNumber === ticketNumber ? { ...b, status: 'cancelled' } : b))
    setUser((u) => ({ ...u, bookings: updated }))
    setConfirming(null)
    try {
      const res = await axios.post(
        `${API_URL}/bookings/${ticketNumber}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data?.updatedBookings) {
        setUser((prevUser) => ({ ...prevUser, bookings: res.data.updatedBookings }))
      }
      setUndoInfo({ ticketNumber, message: `Cancelled ${ticketNumber}` })
      if (undoTimer.current) clearTimeout(undoTimer.current)
      undoTimer.current = setTimeout(() => setUndoInfo(null), 5000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error cancelling booking')
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-tr from-pink-50 via-purple-50 to-blue-50">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">My Bookings</h2>
        <div className="flex gap-3 items-center">
          <Spinner size={32} />
          <div className="text-lg text-purple-800 tracking-wide">Loading bookings...</div>
        </div>
      </div>
    )

  const sortedBookings = [...(user?.bookings || [])].sort(
    (a, b) => new Date(b.travelDate).getTime() - new Date(a.travelDate).getTime()
  )

  return (
    <>
    <div className='h-20'></div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 pt-12 pb-20">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">My Bookings</h2>
        {error && <div className="text-red-600 font-medium mb-4 rounded bg-red-50 p-3 border">{error}</div>}

        {sortedBookings.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800">No bookings yet</h3>
            <p className="text-sm text-gray-500 mt-2">Search trains and book your first ticket to see it here.</p>
            <div className="mt-6">
              <Button
                onClick={() => navigate('/')}
                aria-label="Search trains"
                className="px-6 py-2 bg-primary text-white rounded-full hover:opacity-80 shadow transition"
              >
                Search trains
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedBookings.map((b) => (
              <div
                key={b.ticketNumber}
                className="group relative rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg p-6 transition-all hover:shadow-2xl border border-gray-100 cursor-pointer overflow-hidden"
                tabIndex={0}
                role="button"
                onClick={() => handleView(b.ticketNumber)}
                onKeyDown={(e) => e.key === 'Enter' && handleView(b.ticketNumber)}
                aria-label={`Open booking ${b.ticketNumber}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-30"></div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="text-lg font-bold text-blue-700">
                    {b.trainName} <span className="text-xs text-blue-400/75">({b.trainNumber})</span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">• {b.ticketNumber}</span>
                  <span className="ml-2 px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">{b.class}</span>
                </div>
                <div className="text-md mb-2 font-medium text-gray-700">
                  {b.originStation} 
                  <span className="mx-2 text-pink-600 font-bold">&rarr;</span>
                  {b.destinationStation}
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  <span className="font-semibold text-gray-600">Travel:</span> {formatDate(b.travelDate)} &middot; <span className="font-semibold text-gray-600">Time:</span> {b.time}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-gray-600">Seats:</span> {b.seatNumbers?.join(', ') || '—'}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col items-start">
                    <div className="text-lg font-bold text-pink-600">₹{b.totalFare}</div>
                    <div className={`text-xs font-semibold ${b.status === 'cancelled' ? 'text-red-600' : 'text-green-700'}`}>{b.status}</div>
                  </div>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {b.status !== 'cancelled' ? (
                      <>
                        <Button
                          className={`px-4 py-2 text-white bg-pink-500 rounded-full shadow hover:bg-pink-600 active:bg-pink-700 transition 
                            ${b.status === 'completed' ? 'hidden' : ''} `}
                          disabled={processing}
                          onClick={() => setConfirming(b.ticketNumber)}
                          aria-label={`Cancel ${b.ticketNumber}`}
                        >
                          Cancel
                        </Button>
                        {confirming === b.ticketNumber && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => { handleCancel(b.ticketNumber); setConfirming(null) }}
                              disabled={processing}
                              aria-label={`Confirm cancel ${b.ticketNumber}`}
                              className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-700"
                            >
                              Confirm
                            </Button>
                            <Button
                              onClick={() => setConfirming(null)}
                              disabled={processing}
                              aria-label={`Abort cancel ${b.ticketNumber}`}
                              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                              Abort
                            </Button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-red-600 font-semibold text-xs">Cancelled</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Undo Toast */}
        {undoInfo && (
          <div className="undoToast fixed right-7 bottom-7 bg-gray-900/90 shadow-2xl text-white p-5 rounded-xl border border-gray-700 z-40 animate-fade-in">
            <div className="mb-2 font-semibold text-lg">{undoInfo.message}</div>
            <div className="flex gap-2">
              <Button
                onClick={undoCancel}
                aria-label="Undo cancel"
                disabled={processing}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700 shadow"
              >
                Undo
              </Button>
              <Button
                onClick={() => setUndoInfo(null)}
                aria-label="Dismiss"
                disabled={processing}
                className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default MyBookings
