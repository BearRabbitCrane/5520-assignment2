import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddActivity = ({ navigation }) => {
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

  // Handle date selection
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Validation and Save function
  const validateAndSave = () => {
    // Check if duration is a number and positive
    const durationNumber = parseInt(duration, 10);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid positive number for the duration.");
      return;
    }

    // Check if activityType is selected
    if (!activityType) {
      Alert.alert("Invalid Input", "Please select an activity type.");
      return;
    }

    // Check if the activity should be marked as "special"
    let isSpecial = false;
    if ((activityType === 'running' || activityType === 'weights') && durationNumber > 60) {
      isSpecial = true;
    }

    // If all validations pass, proceed with saving
    Alert.alert(
      "Success", 
      `Activity saved successfully! ${isSpecial ? "This activity is marked as special." : ""}`
    );

    // You would handle saving the activity here, including setting the special flag
    // Example: save the activity to context or send it to an API
    // e.g., saveActivity({ activityType, duration: durationNumber, date, isSpecial });
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
          display="inline"
          onChange={onDateChange}
        />
      )}

      {/* Save Button */}
      <Button title="Save" onPress={validateAndSave} />

      {/* Cancel Button */}
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddActivity;
