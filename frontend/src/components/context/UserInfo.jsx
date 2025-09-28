import React, { createContext, useState } from 'react';
export const UserContext = createContext(null);

const UserInfo = ({children}) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        _id: '',
        address: '',
        state: '',
        district: '',
        city: '',
        pinCode: '',
        dob: '',
        aadhar: '',
        bookings: [],
        role: 'user',
        document: '',
        region: 'India',
        walletBalance: 0
    });
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserInfo;