import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DietContext } from '../Context/DietContext';
import { ThemeContext } from '../Context/ThemeContext';

const AddDietEntry = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor, isDarkTheme } = useContext(ThemeContext); 
  const { addDietEntry } = useContext(DietContext); 

  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerColor, 
      },
      headerTitleStyle: {
        color: textColor, 
      },
    });
  }, [navigation, headerColor, textColor]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); 
    setDate(currentDate);
  };

  const validateAndSave = () => {
    const caloriesNumber = parseInt(calories, 10);
    if (!description.trim()) {
      Alert.alert('Invalid Input', 'Please enter a valid description.');
      return;
    }
    if (isNaN(caloriesNumber) || caloriesNumber <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid positive number for calories.');
      return;
    }
    let isSpecial = caloriesNumber > 800;
    addDietEntry(description, caloriesNumber, date, isSpecial);
    Alert.alert('Success', 'Diet entry saved successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>Description *:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]} 
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={textColor}
        multiline={true} 
        textAlignVertical="top" 
      />
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>Calories *:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
        placeholderTextColor={textColor}
      />
      <Text style={[styles.text, isDarkTheme && { color: '#ffffff' }]}>Date *:</Text>
      <TextInput
        style={[styles.input]}
        placeholder="Select date"
        value={date.toLocaleDateString()} 
        editable={false} 
        onPressIn={() => setShowDatePicker(true)} 
      />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onDateChange}
        />
      )}
      <View style={styles.flexSpacer} />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleCancel}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : styles.noBackgroundButton
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, { color: pressed ? '#fff' : '#1E90FF' }]}>
              Cancel
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={validateAndSave}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.pressedButton : styles.noBackgroundButton
          ]}
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, { color: pressed ? '#fff' : '#1E90FF' }]}>
              Save
            </Text>
          )}
        </Pressable>
      </View>
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
    fontWeight: '500',
    color: '#4c0080',
  },
  input: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#4c0080',
    fontWeight: '400',
    fontSize: 17,
    color: '#4c0080',
    backgroundColor: 'white',
  },
  descriptionInput: { 
    height: 130,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 150,
  },
  flexSpacer: {
    flex: 1,
  },
  button: {
    width: '40%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 5,
  },
  noBackgroundButton: {
    backgroundColor: 'transparent',
  },
  pressedButton: {
    backgroundColor: '#1E90FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddDietEntry;
