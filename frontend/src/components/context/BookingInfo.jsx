import React, { createContext, useState } from 'react'
export const BookingInfoContext = createContext(null);

const BookingInfo = ({children}) => {
    const [booking, setBooking] = useState({
        ticketNumber: "",
        trainId:{},
        trainName: "",
        trainNumber: "",
        bookingDate: {},
        travelDate: {},
        origin: "",
        originStation: "",
        destinationStation: "",
        time: "",
        seatNumbers: [],
        class: '',
        totalFare: null,
        status: "booked"
    })
  return (
    <BookingInfoContext.Provider value={{booking, setBooking}}>
        {children}
    </BookingInfoContext.Provider>
  )
};

export default BookingInfo;