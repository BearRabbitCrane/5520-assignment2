import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import PressableButton from '../Components/PressableButton';
import DatePicker from '../Components/DatePicker';
import InputField from '../Components/InputField';
import { ThemeContext } from '../Context/ThemeContext';
import { addActivityToDB } from '../Firebase/firestoreHelper'; // Import Firestore helper function
import DropDownPicker from 'react-native-dropdown-picker';

const AddActivity = ({ navigation }) => {
  const { backgroundColor, isDarkTheme, headerColor, textColor } = useContext(ThemeContext);
  
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

    let isSpecial = false;
    if ((activityType === 'Running' || activityType === 'Weights') && durationNumber > 60) {
      isSpecial = true;
    }

    try {
      const activityData = {
        activityType,
        duration: durationNumber,
        date: date.toISOString(),
        isSpecial
      };

      const docId = await addActivityToDB(activityData); // Add the activity to Firestore and get the generated ID
      console.log('New activity added with ID:', docId);

      Alert.alert('Success', 'Activity saved successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save activity:', error);
      Alert.alert('Error', 'Failed to save the activity. Please try again.');
    }
  };

  // Set header styles
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: headerColor },
      headerTitleStyle: { color: textColor }
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
  label: { fontSize: 18, marginBottom: 10, fontWeight: '500', color: '#4c0080' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  dropdowninput: { fontSize: 18, fontWeight: '400', color: '#4c0080' },
});

export default AddActivity;
