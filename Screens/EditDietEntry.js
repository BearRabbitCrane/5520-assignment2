
import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Alert, Text, Pressable } from 'react-native';
import CheckBox from 'expo-checkbox';  // Import CheckBox component
import { Ionicons } from '@expo/vector-icons';  // Import Ionicons for trash icon
import PressableButton from '../Components/PressableButton';
import DatePicker from '../Components/DatePicker';
import InputField from '../Components/InputField';
import { ThemeContext } from '../Context/ThemeContext';
import { updateDietEntryInDB, deleteDietEntryFromDB } from '../Firebase/firestoreHelper'; // Import Firestore helper functions

const EditActivity = ({ route, navigation }) => {
  const { backgroundColor, isDarkTheme, headerColor, textColor } = useContext(ThemeContext);
  const { dietEntry } = route.params; // Receive diet details from route params
  
  const [description, setDescription] = useState(dietEntry.description);
  const [calories, setCalories] = useState(dietEntry.calories.toString());
  
  // Pre-populate the date with the activity's date
  const [date, setDate] = useState(dietEntry.date ? new Date(dietEntry.date) : new Date());
  
 // Set the checkbox visual state to false, while `isSpecial` reflects the true special status
  const [isSpecial, setIsSpecial] = useState(dietEntry.isSpecial);
  const [isChecked, setIsChecked] = useState(false); // Visually unchecked initially
  const descriptionFieldRef = useRef();
  const caloriesFieldRef = useRef();

  const validateAndSave = async () => {
    // Update `isSpecial` only if the user has interacted with the checkbox
    const updatedSpecialState = isChecked ? false : isSpecial;

    if (!descriptionFieldRef.current.validate()) {
      Alert.alert('Invalid Input', 'Please provide a valid description.');
      return;
    }

    if (!caloriesFieldRef.current.validate()) {
      Alert.alert('Invalid Input', 'Please provide a valid calorie count.');
      return;
    }

    const caloriesNumber = parseInt(calories, 10);

    const updatedDietData = {
      description,
      calories: caloriesNumber,
      date: date.toISOString(), // Convert date to ISO string for storage
      isSpecial: isChecked ? false : isSpecial // Save updated special state
    };

    // Confirmation before saving
    Alert.alert(
      'Important',
      'Are you sure you want to save these changes?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await updateDietEntryInDB(dietEntry.id, updatedDietData); // Update diet in Firestore
              Alert.alert('Success', 'Diet entry updated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              console.error('Failed to update Diet entry:', error);
              Alert.alert('Error', 'Failed to update the Diet entry. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    // Show delete confirmation alert
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await deleteDietEntryFromDB(dietEntry.id); // Delete from Firestore
              Alert.alert('Deleted', 'The item has been deleted successfully.');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting entry:', error);
              Alert.alert('Error', 'Failed to delete the entry.');
            }
          },
        },
      ]
    );
  };

  // Set header styles, including the delete icon
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: headerColor },
      headerTitleStyle: { color: textColor },
      title: 'Edit Diet Entry',
      // Add a trash icon to the right side of the header
      headerRight: () => (
        <View style={{ paddingRight: 15 }}>
        <Pressable onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color={textColor} />
        </Pressable>
        </View>
      ),
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

        {/* Pre-populate date with the date from activity */}
        <DatePicker label="Date" date={date} setDate={setDate} isDarkTheme={isDarkTheme} />

        {/* Checkbox to toggle special state */}
        {/* Conditionally render checkbox only if the entry is special */}
        {dietEntry.isSpecial && (
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={(newValue) => {
              setIsChecked(newValue);
              console.log("Checkbox toggled, isChecked is now:", newValue);
            }} // Toggle special state
            tintColors={{ true: '#4c0080', false: '#000' }}
          />
          <Text style={[styles.specialText]}>
            This item is marked as special. Select the checkbox if you would like to approve it.
          </Text>
        </View>
        )}
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
    marginBottom: 40 
  },
  dropdowninput: { 
    fontSize: 18, 
    fontWeight: '400', 
    color: '#4c0080' 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 250,  // Adjust this margin for better spacing
  },
  specialText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#4c0080',
  },
  label: { 
    fontSize: 18, 
    marginBottom: 10, 
    fontWeight: '500', 
    color: '#4c0080' 
  },
});

export default EditActivity;
