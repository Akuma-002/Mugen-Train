import React, { createContext, useState } from 'react'
export const TrainOneContext = createContext(null);
const TrainOne = ({children}) => {
    const [trainOne, setTrainOne] = useState({});
  return (
    <TrainOneContext.Provider value={{trainOne, setTrainOne}}>
        {children}
    </TrainOneContext.Provider>
  )
}

export default TrainOne