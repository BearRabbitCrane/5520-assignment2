import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import PressableButton from '../Components/PressableButton';  // Reuse PressableButton
import DatePicker from '../Components/DatePicker';  // Reuse DatePicker
import InputField from '../Components/InputField';  // Reuse InputField
import { ThemeContext } from '../Context/ThemeContext';
import { DietContext } from '../Context/DietContext'; 

const AddDietEntry = ({ navigation }) => {
  const { backgroundColor, isDarkTheme } = useContext(ThemeContext);
  const { addDietEntry } = useContext(DietContext);

  const [description, setDescription] = useState(''); 
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());

  // Use refs to validate inputs on submit
  const descriptionFieldRef = useRef();
  const caloriesFieldRef = useRef();

  const validateAndSave = () => {
    if (!descriptionFieldRef.current.validate()) {
      Alert.alert('Invalid Input', 'Please provide a valid description.');
      return;
    }

    if (!caloriesFieldRef.current.validate()) {
      Alert.alert('Invalid Input', 'Please provide a valid calorie count.');
      return;
    }

    // Parse calories and mark as special if calories are over 800
    const caloriesNumber = parseInt(calories, 10);
    const isSpecial = caloriesNumber > 800;

    addDietEntry(description, caloriesNumber, date, isSpecial);
    Alert.alert('Success', 'Diet entry saved successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Reusing InputField for Description with multiline and custom height */}
      <InputField
        label="Description *"
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        isDarkTheme={isDarkTheme}
        isRequired={true}  // Mark as required
        multiline={true}  // Enable multiline for description
        inputStyle={{ height: 120 }}  // Custom height, roughly 3x other fields
        ref={descriptionFieldRef}  // Pass ref for validation on Save
      />

      {/* Reusing InputField for Calories */}
      <InputField
        label="Calories *"
        placeholder="Enter calories"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
        isDarkTheme={isDarkTheme}
        isRequired={true}  // Mark as required
        validateNumber={true}  // Validate that the input is a number
        ref={caloriesFieldRef}  // Pass ref for validation on Save
      />

      {/* Date Picker */}
      <DatePicker label="Date" date={date} setDate={setDate} isDarkTheme={isDarkTheme} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PressableButton title="Cancel" onPress={() => navigation.goBack()} type="secondary" />
        <PressableButton title="Save" onPress={validateAndSave} type="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default AddDietEntry;
