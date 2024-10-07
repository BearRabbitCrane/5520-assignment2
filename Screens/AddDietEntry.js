import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext'; // Import the context

const AddDietEntry = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { addDietEntry } = useContext(DietContext); // Access the context

  // Handle date selection
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Validation and Save function
  const validateAndSave = () => {
    const caloriesNumber = parseInt(calories, 10);

    // Check if description is empty
    if (!description.trim()) {
      Alert.alert("Invalid Input", "Please enter a valid description.");
      return;
    }

    // Check if calories is a valid positive number
    if (isNaN(caloriesNumber) || caloriesNumber <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid positive number for calories.");
      return;
    }

    // Check if the entry should be marked as "special"
    let isSpecial = false;
    if (caloriesNumber > 800) {
      isSpecial = true;
    }

    // Add the new diet entry to the context
    addDietEntry(description, caloriesNumber, date, isSpecial);

    // Show success message and navigate back to the previous screen
    Alert.alert("Success", "Diet entry saved successfully!", [
      { text: "OK", onPress: () => navigation.goBack() } // Navigates back to the previous screen
    ]);
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Description Input */}
      <Text>Description:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Calories Input */}
      <Text>Calories:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Enter calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
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
          display="inline" // Ensures the calendar is shown inline as requested
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

export default AddDietEntry;
