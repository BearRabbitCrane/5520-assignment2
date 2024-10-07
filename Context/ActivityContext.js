import React, { createContext, useState } from 'react';

// Create ActivityContext
export const ActivityContext = createContext();

// Create the provider component
export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([
    { id: 1, activityType: 'Running', duration: 45, date: new Date() },
    { id: 2, activityType: 'Cycling', duration: 60, date: new Date() },
  ]);

  // Function to add a new activity entry
  const addActivity = (activityType, duration, date, isSpecial) => {
    const newActivity = {
      id: activities.length + 1,
      activityType,
      duration,
      date,
      isSpecial,
    };
    setActivities([...activities, newActivity]);
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
