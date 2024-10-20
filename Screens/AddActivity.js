import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { ActivityContext } from '../Context/ActivityContext'; // Import ActivityContext to manage activities
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext for dynamic theming

const AddActivity = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor, isDarkTheme } = useContext(ThemeContext); // Get theme values from ThemeContext
  const { addActivity } = useContext(ActivityContext); // Access addActivity function from ActivityContext
  
  // Local state to manage activity input values
  const [activityType, setActivityType] = useState(null); // Activity type selected from DropDown
  const [open, setOpen] = useState(false); // Control the visibility of DropDownPicker
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' }
  ]); // Predefined activity options
  const [duration, setDuration] = useState(''); // Duration of the activity
  const [date, setDate] = useState(new Date()); // Date selected for the activity
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of DateTimePicker

  // Handle changes when a new date is selected from DateTimePicker
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Hide DateTimePicker after a date is selected
    setDate(currentDate); // Update date state
  };

  // Function to validate user input and save the activity
  const validateAndSave = () => {
    const durationNumber = parseInt(duration, 10); // Parse duration input to an integer
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid positive number for the duration."); // Show error for invalid duration
      return;
    }
    if (!activityType) {
      Alert.alert("Invalid Input", "Please select an activity type."); // Show error if activity type is not selected
      return;
    }
    let isSpecial = false;
    if ((activityType === 'Running' || activityType === 'Weights') && durationNumber > 60) {
      isSpecial = true; // Mark activity as special if it's Running or Weights and duration > 60
    }
    // Add the activity using the context function
    addActivity(activityType, durationNumber, date, isSpecial);
    Alert.alert("Success", "Activity saved successfully!", [{ text: "OK", onPress: () => navigation.goBack() }]); // Navigate back after success
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
      {/* Activity Type Dropdown */}
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>Activity Type *:</Text>
      <DropDownPicker
        textStyle={styles.dropdowninput}
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        style={{ marginBottom: 10 }}
        placeholder="Select Activity Type"
      />

      {/* Duration Input */}
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>Duration (min) *:</Text>
      <TextInput
        style={[styles.input]}
        placeholder="Enter duration"
        keyboardType="numeric" // Ensure only numbers can be entered
        value={duration}
        onChangeText={setDuration}
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

// Styles for AddActivity screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4c0080',
    fontWeight: '500',
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
  dropdowninput: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4c0080'
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

export default AddActivity;
