import React, { createContext, useState } from 'react'
export const DesignContext = createContext(null);
const DesignInfo = ({children}) => {
     const [design, setDesign] = useState({
        "navbarColor": "transparent",
        "navTextColor": "black",
     });
  return (
    <DesignContext.Provider value={{design, setDesign}}>
        {children}
    </DesignContext.Provider>
  )
}

export default DesignInfo