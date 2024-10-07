import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddActivity = ({ navigation }) => {
  // State for the form inputs
  const [activityType, setActivityType] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'walking' },
    { label: 'Running', value: 'running' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Weights', value: 'weights' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Cycling', value: 'cycling' },
    { label: 'Hiking', value: 'hiking' }
  ]);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date selection
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Activity Type Dropdown */}
      <Text>Activity Type:</Text>
      <DropDownPicker
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
      <Text>Duration (minutes):</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter duration"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      {/* Date Picker */}
      <Text>Date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
          placeholder="Select date"
          value={date.toLocaleDateString()}
          editable={false}
        />
      </TouchableOpacity>
      
      {/* Date Picker Display */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline" // Ensures the picker shows inline as requested
          onChange={onDateChange}
        />
      )}

      {/* Buttons */}
      <Button title="Submit" onPress={() => {/* Handle form submission */}} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddActivity;
