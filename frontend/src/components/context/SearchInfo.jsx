import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const SearchInfoContext = createContext(null);
const SearchInfo = ({children}) => {
    const [searchInfo, setSearchInfo] = useState({source: '',
    destination: '',
    date: '',
    trainClass: '',
    passengers: null,});
  return (
    <SearchInfoContext.Provider value={{searchInfo, setSearchInfo}}>
      {children}
    </SearchInfoContext.Provider>
  )
}

export default SearchInfo;