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

  // Purple theme values based on the current theme
  const theme = {
    backgroundColor: isDarkTheme ? '#bf80ff' : '#d1c4e9', // Dark and light purple backgrounds
    textColor:  '#ffffff', 
    headerColor: '#4527a0',      // Darker purple for headers
    tabBarColor: '#4527a0',      // Dark purple for the tab bar
    isDarkTheme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
