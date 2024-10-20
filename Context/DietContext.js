import React, { createContext, useState } from 'react';

// Create DietContext
export const DietContext = createContext();

// Create the provider component
export const DietProvider = ({ children }) => {
  const [dietEntries, setDietEntries] = useState([]);

  // Function to add a new diet entry
  const addDietEntry = (description, calories, date, isSpecial) => {
    const newEntry = {
      id: dietEntries.length + 1,
      description,
      calories,
      date,
      isSpecial,
    };
    setDietEntries([...dietEntries, newEntry]);
  };

  return (
    <DietContext.Provider value={{ dietEntries, addDietEntry }}>
      {children}
    </DietContext.Provider>
  );
};
