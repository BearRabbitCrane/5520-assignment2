import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
      <Pressable
        onPress={toggleTheme}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#1E90FF' : '#4527a0' }, // Change background color when pressed
        ]}
      >
        {({ pressed }) => (
          <Text style={[styles.buttonText, { color: pressed ? '#fff' : '#ffffff' }]}>
            Toggle Theme
          </Text>
        )}
      </Pressable>
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
    fontWeight: 'bold'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
