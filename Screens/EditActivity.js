import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import CheckBox from 'expo-checkbox';  // Import CheckBox component
import PressableButton from '../Components/PressableButton';
import DatePicker from '../Components/DatePicker';
import InputField from '../Components/InputField';
import { ThemeContext } from '../Context/ThemeContext';
import { updateActivityInDB } from '../Firebase/firestoreHelper'; // Firestore helper function
import DropDownPicker from 'react-native-dropdown-picker';

const EditActivity = ({ route, navigation }) => {
  const { backgroundColor, isDarkTheme, headerColor, textColor } = useContext(ThemeContext);
  const { activity } = route.params; // Receive activity details from route params
  
  const [activityType, setActivityType] = useState(activity.activityType);
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
  const [duration, setDuration] = useState(activity.duration.toString());
  
  // Pre-populate the date with the activity's date
  const [date, setDate] = useState(activity.date ? new Date(activity.date) : new Date());
  
  const [isSpecial, setIsSpecial] = useState(activity.isSpecial);  // Checkbox for special entry
  const durationFieldRef = useRef();

  const validateAndSave = async () => {
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

    const updatedActivity = {
      activityType,
      duration: durationNumber,
      date: date.toISOString(), // Convert date to ISO string for storage
      isSpecial: isSpecial // Save updated special state
    };

    try {
      await updateActivityInDB(activity.id, updatedActivity); // Update activity in Firestore
      Alert.alert('Success', 'Activity updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update activity:', error);
      Alert.alert('Error', 'Failed to update the activity. Please try again.');
    }
  };

  // Set header styles
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: headerColor },
      headerTitleStyle: { color: textColor },
      title: 'Edit Activity',
    });
  }, [navigation, headerColor, textColor]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.contentContainer}>
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

        <InputField
          label="Duration (min)"
          placeholder="Enter duration"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          isDarkTheme={isDarkTheme}
          isRequired={true}
          validateNumber={true}
          ref={durationFieldRef}
        />

        {/* Pre-populate date with the date from activity */}
        <DatePicker label="Date" date={date} setDate={setDate} isDarkTheme={isDarkTheme} />

        {/* Checkbox to toggle special state */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSpecial}
            onValueChange={setIsSpecial} // Toggle special state
            tintColors={{ true: '#4c0080', false: '#000' }}
          />
          <Text style={[styles.specialText]}>
            This item is marked as special. Select the checkbox if you would like to approve it.
          </Text>
        </View>
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
  label: { 
    fontSize: 18, 
    marginBottom: 10, 
    fontWeight: '500', 
    color: '#4c0080' 
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
    marginTop: 300,  // Adjust this margin for better spacing
  },
  specialText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#4c0080',
  },
});

export default EditActivity;
