import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext'; // Ensure the path is correct
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const AddDietEntry = ({ navigation }) => {
  const { backgroundColor, textColor } = useContext(ThemeContext); // Access theme context
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
      alert("Please enter a valid description.");
      return;
    }

    // Check if calories is a valid positive number
    if (isNaN(caloriesNumber) || caloriesNumber <= 0) {
      alert("Please enter a valid positive number for calories.");
      return;
    }

    // Check if the entry should be marked as "special"
    let isSpecial = false;
    if (caloriesNumber > 800) {
      isSpecial = true;
    }

    // Add the new diet entry to the context
    addDietEntry(description, caloriesNumber, date, isSpecial);

    // Navigate back to the previous screen
    alert("Diet entry saved successfully!");
    navigation.goBack(); // Return to the previous screen (the correct tab will be maintained)
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Description Input */}
      <Text style={[styles.text, { color: textColor }]}>Description:</Text>
      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={textColor}
      />

      {/* Calories Input */}
      <Text style={[styles.text, { color: textColor }]}>Calories:</Text>
      <TextInput
        style={[styles.input, { color: textColor, borderColor: textColor }]}
        placeholder="Enter calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
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

export default AddDietEntry;
