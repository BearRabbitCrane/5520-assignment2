import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import PressableButton from '../Components/PressableButton';  // Reuse PressableButton
import DatePicker from '../Components/DatePicker';  // Reuse DatePicker
import InputField from '../Components/InputField';  // Reuse InputField
import { ThemeContext } from '../Context/ThemeContext';
import { ActivityContext } from '../Context/ActivityContext';
import DropDownPicker from 'react-native-dropdown-picker';

const AddActivity = ({ navigation }) => {
  const { backgroundColor, isDarkTheme } = useContext(ThemeContext);
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

  const validateAndSave = () => {
    if (!activityType || !duration) {
      Alert.alert('Invalid Input', 'All fields are required.');
      return;
    }

    // Check if duration is a valid number and mark activity as special
    const durationNumber = parseInt(duration, 10);
    let isSpecial = false;
    if ((activityType === 'Running' || activityType === 'Weights') && durationNumber > 60) {
      isSpecial = true;
    }

    addActivity(activityType, durationNumber, date, isSpecial);
    Alert.alert('Success', 'Activity saved successfully!');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
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
        isRequired={true}  // Mark duration field as required
        validateNumber={true}  // Validate if the input is a number
      />
      
      {/* Date Picker */}
      <DatePicker label="Date" date={date} setDate={setDate} isDarkTheme={isDarkTheme} />
      
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PressableButton title="Cancel" onPress={() => navigation.goBack()} type="secondary" />
        <PressableButton title="Save" onPress={validateAndSave} type="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
    color: '#4c0080',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dropdowninput: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4c0080'
  },
});

export default AddActivity;
