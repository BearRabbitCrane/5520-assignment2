import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const Settings = () => {
  const { isDarkTheme, toggleTheme, backgroundColor, textColor } = useContext(ThemeContext); // Access the theme context

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        Current Theme: {isDarkTheme ? 'Dark' : 'Light'}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Settings;
