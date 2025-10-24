import React, { createContext , useState} from 'react'
//train list context
export const TrainListContext = createContext(null);
const TrainList = ({children}) => {
    const [trains, setTrains] = useState([]);
  return (
    <TrainListContext.Provider value={{trains, setTrains}}>
        {children}
    </TrainListContext.Provider>
  )
}

export default TrainList