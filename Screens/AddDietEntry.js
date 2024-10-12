import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext';
import { ThemeContext } from '../Context/ThemeContext';

const AddDietEntry = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext); // Access theme context
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { addDietEntry } = useContext(DietContext); // Access diet context

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerColor, // Use headerColor from ThemeContext
      },
      headerTitleStyle: {
        color: textColor, // Use textColor from ThemeContext
      },
    });
  }, [navigation, headerColor, textColor]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const validateAndSave = () => {
    const caloriesNumber = parseInt(calories, 10);

    // Validate description
    if (!description.trim()) {
      alert('Please enter a valid description.');
      return;
    }

    // Validate calories
    if (isNaN(caloriesNumber) || caloriesNumber <= 0) {
      alert('Please enter a valid positive number for calories.');
      return;
    }

    // Check if the entry should be marked as special
    let isSpecial = false;
    if (caloriesNumber > 800) {
      isSpecial = true;
    }

    // Add the new diet entry to the context
    addDietEntry(description, caloriesNumber, date, isSpecial);

    // Show success alert and navigate back
    alert('Diet entry saved successfully!');
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

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={onDateChange}
        />
      )}

      {/* Save and Cancel Buttons */}
      <Button title="Save" onPress={validateAndSave} />
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
