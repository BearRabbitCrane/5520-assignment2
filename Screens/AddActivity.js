import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { ActivityContext } from '../Context/ActivityContext'; 
import { ThemeContext } from '../Context/ThemeContext';

const AddActivity = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext);
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
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // Ensure picker is hidden after selection or cancel
    setDate(currentDate);
  };

  const validateAndSave = () => {
    const durationNumber = parseInt(duration, 10);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid positive number for the duration.");
      return;
    }
    if (!activityType) {
      Alert.alert("Invalid Input", "Please select an activity type.");
      return;
    }
    let isSpecial = false;
    if ((activityType === 'Running' || activityType === 'Weights') && durationNumber > 60) {
      isSpecial = true;
    }
    addActivity(activityType, durationNumber, date, isSpecial);
    Alert.alert("Success", "Activity saved successfully!", [{ text: "OK", onPress: () => navigation.goBack() }]);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

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

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text]}>Activity Type *:</Text>
      <DropDownPicker
        textStyle={styles.dropdowninput}
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        style={{ marginBottom: 10 }}
        placeholder="Select Activity Type"
      />
      <Text style={[styles.text]}>Duration (min) *:</Text>
      <TextInput
        style={[styles.input]}
        placeholder="Enter duration"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholderTextColor={textColor}
      />
      <Text style={[styles.text]}>Date *:</Text>
      <TextInput
        style={[styles.input]}
        placeholder="Select date"
        value={date.toLocaleDateString()} // Display the date
        editable={false} // Prevent typing
        onPressIn={() => setShowDatePicker(true)} // Trigger date picker when tapped
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
    color: '#4c0080',
    fontWeight: '500',
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
  dropdowninput: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4c0080'
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

export default AddActivity;
