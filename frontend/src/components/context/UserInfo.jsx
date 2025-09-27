import React, { createContext, useState } from 'react'
export const UserContext = createContext(1);
const UserInfo = ({children}) => {
    const [user, setUser] = useState({
        name:'',
        email:'',
        phone:'',
        _id:'',
        address:'',
        state:'',
        district:'',
        city:'',
        pinCode:'',
        dob:'',
        aadhar:''
    })
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserInfo