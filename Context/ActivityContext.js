import React, { createContext, useState, useCallback } from 'react';

// Create ActivityContext
export const ActivityContext = createContext();

// Create the provider component
export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  // Function to add a new activity entry
  const addActivity = useCallback((activityType, duration, date, isSpecial) => {
    const newActivity = {
      id: activities.length + 1, // Increment ID based on current list length
      activityType,
      duration,
      date, // Ensure date is passed correctly
      isSpecial,
    };
    
    setActivities((prevActivities) => [...prevActivities, newActivity]); // Use function form of setState
  }, [activities]);

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
