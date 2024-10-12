import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const Settings = ({ navigation }) => {
  const { isDarkTheme, toggleTheme, backgroundColor, textColor, headerColor } = useContext(ThemeContext); // Access the theme context

  // Apply header style based on theme
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerColor, // Set the header background color from ThemeContext
      },
      headerTitleStyle: {
        color: textColor, // Set the header text color
      },
    });
  }, [navigation, headerColor, textColor]);

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
