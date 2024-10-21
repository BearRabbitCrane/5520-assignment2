import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import PressableButton from '../Components/PressableButton';
import DatePicker from '../Components/DatePicker';
import InputField from '../Components/InputField';
import { ThemeContext } from '../Context/ThemeContext';
import { ActivityContext } from '../Context/ActivityContext'; 
import DropDownPicker from 'react-native-dropdown-picker';

const AddActivity = ({ navigation }) => {
  const { backgroundColor, isDarkTheme, headerColor, textColor } = useContext(ThemeContext);
  const { addActivity } = useContext(ActivityContext);

  const [activityType, setActivityType] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' }
  ]);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());

  // Use refs to validate inputs on submit
  const durationFieldRef = useRef();

  const validateAndSave = () => {
    // Validate duration
    if (!durationFieldRef.current.validate()) {
      Alert.alert('Invalid Input', 'Please provide a valid duration.');
      return;
    }

    const durationNumber = parseInt(duration, 10);
    if (durationNumber <= 0) {
      Alert.alert('Invalid Input', 'Duration must be a positive number.');
      return;
    }

    if (!activityType) {
      Alert.alert('Invalid Input', 'Please select an activity type.');
      return;
    }

    // Check if the duration is a valid number and mark activity as special
    let isSpecial = false;
    if ((activityType === 'Running' || activityType === 'Weights') && durationNumber > 60) {
      isSpecial = true;
    }

    // Save activity
    addActivity(activityType, durationNumber, date, isSpecial);
    Alert.alert('Success', 'Activity saved successfully!');
    navigation.goBack();
  };

  // Set the same header colors as the Activities screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerColor, // Apply the same background color as Activities
      },
      headerTitleStyle: {
        color: textColor, // Apply the same text color as Activities
      },
    });
  }, [navigation, headerColor, textColor]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.contentContainer}>
      {/* Dropdown Picker */}
      <Text style={styles.label}>Activity Type *:</Text>
      <DropDownPicker
        textStyle={styles.dropdowninput}
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        placeholder="Select Activity Type"
        style={{ marginBottom: 10 }}
      />
      
      {/* Duration Input */}
      <InputField
        label="Duration (min)"
        placeholder="Enter duration"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        isDarkTheme={isDarkTheme}
        isRequired={true}
        validateNumber={true}
        ref={durationFieldRef}  // Pass the ref to validate on save
      />
      
      {/* Date Picker */}
      <DatePicker label="Date" date={date} setDate={setDate} isDarkTheme={isDarkTheme} />
      </View>
      
      {/* Buttons */}
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
    padding: 20,
  },
  contentContainer: {
    flex: 1,  // This will push buttons to the bottom
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: '#4c0080',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,  // Add margin to move buttons up a bit from the bottom
  },
  dropdowninput: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4c0080'
  },
});

export default AddActivity;
