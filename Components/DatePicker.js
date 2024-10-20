import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import commonStyles from '../Helpers/styles';

const DatePicker = ({ label, date, setDate, isDarkTheme }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);  // Controls the visibility of the DateTimePicker
  const [displayedDate, setDisplayedDate] = useState('');  // Initially empty

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date || new Date();
    setShowDatePicker(false);  // Hide DateTimePicker after a date is selected or canceled
    setDate(currentDate);  // Update the parent component with the selected date
    setDisplayedDate(currentDate.toLocaleDateString());  // Display the selected date
  };

  // Handle the input field press
  const handlePressIn = () => {
    if (!showDatePicker) {
      // If the DatePicker is not open, open it and set the current date if it's not already set
      setDate(new Date());
      setDisplayedDate(new Date().toLocaleDateString());
      setShowDatePicker(true);  // Show DateTimePicker
    } else {
      setShowDatePicker(false);  // Dismiss DateTimePicker if it is already open
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>{label}:</Text>
        <TextInput
          style={styles.input}
          placeholder="Select date"
          value={displayedDate}  // Display the selected date or empty field
          editable={false}
          onPressIn={handlePressIn}  // Show DateTimePicker when input is pressed
        />
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}  // If no date is selected, default to current date
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onDateChange}  // Handle date selection
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: commonStyles.primaryColor,
  },
  input: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: commonStyles.primaryColor,
    fontSize: 17,
    color: commonStyles.primaryColor,
    backgroundColor: 'white',
  },
});

export default DatePicker;
