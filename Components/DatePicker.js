import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import commonStyles from '../Helpers/styles';

const DatePicker = ({ label, date, setDate, isDarkTheme }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Hide DateTimePicker after a date is selected
    setDate(currentDate); // Update date state
  };

  return (
    <View>
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>{label}:</Text>
      <TextInput
        style={styles.input}
        placeholder="Select date"
        value={date.toLocaleDateString()}
        editable={false}
        onPressIn={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDateChange}
        />
      )}
    </View>
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
