import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import PressableButton from '../Components/PressableButton';
import DatePicker from '../Components/DatePicker';
import InputField from '../Components/InputField';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDietEntryInDB } from '../Firebase/firestoreHelper'; // Firestore helper function

// Helper function to format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const EditDietEntry = ({ route, navigation }) => {
  const { backgroundColor, isDarkTheme, headerColor, textColor } = useContext(ThemeContext);
  const { dietEntry } = route.params; // Receive diet entry details from route params
  
  // State to store form inputs
  const [description, setDescription] = useState(dietEntry.description);
  const [calories, setCalories] = useState(dietEntry.calories.toString());
  
  // Parse the incoming date as YYYY-MM-DD
  const [date, setDate] = useState(new Date(dietEntry.date));
  
  const descriptionFieldRef = useRef();
  const caloriesFieldRef = useRef();

  const validateAndSave = async () => {
    if (!descriptionFieldRef.current.validate()) {
      Alert.alert('Invalid Input', 'Please provide a valid description.');
      return;
    }

    if (!caloriesFieldRef.current.validate()) {
      Alert.alert('Invalid Input', 'Please provide a valid calorie count.');
      return;
    }

    const caloriesNumber = parseInt(calories, 10);
    const isSpecial = caloriesNumber > 800;

    // Format the selected date to store only YYYY-MM-DD
    const formattedDate = formatDate(date);

    const updatedDietData = {
      description,
      calories: caloriesNumber,
      date: formattedDate, // Store only the date (YYYY-MM-DD)
      isSpecial
    };

    try {
      await updateDietEntryInDB(dietEntry.id, updatedDietData); // Update the diet entry in Firestore
      Alert.alert('Success', 'Diet entry updated successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Failed to update diet entry:', error);
      Alert.alert('Error', 'Failed to update the diet entry. Please try again.');
    }
  };

  // Set header styles
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: headerColor },
      headerTitleStyle: { color: textColor },
      title: 'Edit Diet Entry',
    });
  }, [navigation, headerColor, textColor]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.contentContainer}>
        <InputField
          label="Description *"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          isDarkTheme={isDarkTheme}
          isRequired={true}
          multiline={true}
          inputStyle={{ height: 120 }}
          ref={descriptionFieldRef}
        />

        <InputField
          label="Calories *"
          placeholder="Enter calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
          isDarkTheme={isDarkTheme}
          isRequired={true}
          validateNumber={true}
          ref={caloriesFieldRef}
        />

        {/* Pass the parsed date to DatePicker */}
        <DatePicker label="Date" date={date} setDate={setDate} isDarkTheme={isDarkTheme} />
      </View>

      <View style={styles.buttonContainer}>
        <PressableButton title="Cancel" onPress={() => navigation.goBack()} type="secondary" />
        <PressableButton title="Save" onPress={validateAndSave} type="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  contentContainer: { 
    flex: 1 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30 
  },
});

export default EditDietEntry;
