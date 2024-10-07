import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform, Alert, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const AddActivity = ({ navigation }) => {
  const { backgroundColor, textColor } = useContext(ThemeContext); // Access theme context
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
    const durationNumber = parseInt(duration, 10);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid positive number for the duration.");
      return;
    }

    if (!activityType) {
      Alert.alert("Invalid Input", "Please select an activity type.");
      return;
    }

    let isSpecial = false;
    if ((activityType === 'running' || activityType === 'weights') && durationNumber > 60) {
      isSpecial = true;
    }

    Alert.alert(
      "Success", 
      `Activity saved successfully! ${isSpecial ? "This activity is marked as special." : ""}`
    );

    // Save logic here, for example updating context or sending to API
  };

  // Cancel button handler: go back to the previous screen
  const handleCancel = () => {
    navigation.goBack(); // Navigates back to the previous screen
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Activity Type Dropdown */}
      <Text style={[styles.text, { color: textColor }]}>Activity Type:</Text>
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
      <Text style={[styles.text, { color: textColor }]}>Duration (minutes):</Text>
      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Enter duration"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholderTextColor={textColor}
      />

      {/* Date Picker */}
      <Text style={[styles.text, { color: textColor }]}>Date:</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={[styles.input, { color: textColor, borderColor: textColor }]}
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
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddActivity;
