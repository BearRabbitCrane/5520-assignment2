import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import PressableButton from '../Components/PressableButton';  
import DatePicker from '../Components/DatePicker';  
import InputField from '../Components/InputField';  
import { ThemeContext } from '../Context/ThemeContext';
import { addDietEntryToDB } from '../Firebase/firestoreHelper'; // Import Firestore helper function

const AddDietEntry = ({ navigation }) => {
  const { backgroundColor, isDarkTheme, headerColor, textColor } = useContext(ThemeContext);
  
  const [description, setDescription] = useState(''); 
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
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

    const dietData = {
      description,
      calories: caloriesNumber,
      date: date.toISOString(),
      isSpecial
    };

    try {
      const docId = await addDietEntryToDB(dietData); // Add diet entry to Firestore and get the generated ID
      console.log('New diet entry added with ID:', docId);

      Alert.alert('Success', 'Diet entry saved successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Failed to save diet entry:', error);
      Alert.alert('Error', 'Failed to save the diet entry. Please try again.');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: headerColor },
      headerTitleStyle: { color: textColor }
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
  container: { flex: 1, padding: 20 },
  contentContainer: { flex: 1 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
});

export default AddDietEntry;
