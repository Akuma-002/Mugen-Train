import React, { createContext, useState } from 'react'
export const LoginContext = createContext(null);
const LoginInfo = ({children}) => {
    
    const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{login, setLogin}}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginInfo