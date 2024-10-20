import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext'; // Import DietContext to manage diet entries
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext for dynamic theming

const AddDietEntry = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor, isDarkTheme } = useContext(ThemeContext); // Get theme values from ThemeContext
  const { addDietEntry } = useContext(DietContext); // Access addDietEntry function from DietContext

  // Local state to manage diet entry input values
  const [description, setDescription] = useState(''); // Description of the diet entry
  const [calories, setCalories] = useState(''); // Calories input
  const [date, setDate] = useState(new Date()); // Date selected for the diet entry
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of DateTimePicker

  // Handle changes when a new date is selected from DateTimePicker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Hide DateTimePicker after a date is selected
    setDate(currentDate); // Update date state
  };

  // Function to validate user input and save the diet entry
  const validateAndSave = () => {
    const caloriesNumber = parseInt(calories, 10); // Parse calories input to an integer
    if (!description.trim()) {
      Alert.alert('Invalid Input', 'Please enter a valid description.'); // Show error if description is empty
      return;
    }
    if (isNaN(caloriesNumber) || caloriesNumber <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid positive number for calories.'); // Show error for invalid calories
      return;
    }
    let isSpecial = caloriesNumber > 800; // Mark diet entry as special if calories > 800
    addDietEntry(description, caloriesNumber, date, isSpecial); // Add the diet entry using the context function
    Alert.alert('Success', 'Diet entry saved successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]); // Navigate back after success
  };

  // Handle cancel action
  const handleCancel = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  // Set dynamic header styles based on the current theme
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerColor, // Header background color based on theme
      },
      headerTitleStyle: {
        color: textColor, // Header text color based on theme
      },
    });
  }, [navigation, headerColor, textColor]); // Trigger when navigation or theme values change

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Description Input */}
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>Description *:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]} // Style for multiline input
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={textColor} // Placeholder text color based on theme
        multiline={true} // Enable multiline input
        textAlignVertical="top" // Align text to the top for multiline input
      />

      {/* Calories Input */}
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>Calories *:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter calories"
        keyboardType="numeric" // Ensure only numbers can be entered
        value={calories}
        onChangeText={setCalories}
        placeholderTextColor={textColor} // Placeholder text color based on theme
      />

      {/* Date Picker */}
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>Date *:</Text>
      <TextInput
        style={[styles.input]}
        placeholder="Select date"
        value={date.toLocaleDateString()} // Display selected date
        editable={false} // Prevent manual editing of the date input
        onPressIn={() => setShowDatePicker(true)} // Show DateTimePicker on press
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'} // Show inline picker on iOS
          onChange={onDateChange} // Update date on selection
        />
      )}

      {/* Spacer to separate form inputs from buttons */}
      <View style={styles.flexSpacer} />

      {/* Cancel and Save Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleCancel}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : styles.noBackgroundButton
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, { color: pressed ? '#fff' : '#1E90FF' }]}>
              Cancel
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={validateAndSave}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : styles.noBackgroundButton
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, { color: pressed ? '#fff' : '#1E90FF' }]}>
              Save
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

// Styles for AddDietEntry screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: '#4c0080',
  },
  input: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#4c0080',
    fontWeight: '400',
    fontSize: 17,
    color: '#4c0080',
    backgroundColor: 'white',
  },
  descriptionInput: { // Style for multiline description input
    height: 130,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 150,
  },
  flexSpacer: {
    flex: 1,
  },
  button: {
    width: '40%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 5,
  },
  noBackgroundButton: {
    backgroundColor: 'transparent',
  },
  pressedButton: {
    backgroundColor: '#1E90FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddDietEntry;
