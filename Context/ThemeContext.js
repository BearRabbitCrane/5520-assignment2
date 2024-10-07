import React, { createContext, useState } from 'react';

// Create ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component to wrap around the app
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Theme values based on the current theme
  const theme = {
    backgroundColor: isDarkTheme ? '#333' : '#fff',
    textColor: isDarkTheme ? '#fff' : '#000',
    isDarkTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
