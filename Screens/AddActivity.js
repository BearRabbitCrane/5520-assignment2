import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddActivity = ({ navigation }) => {
  const [activityType, setActivityType] = useState(null);



  return (
    <View style={{ padding: 20 }}>
      <Text>Activity Name:</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10 }} />

      

      <Text>Activity Type:</Text>
      <DropDownPicker
        open={true} // Change this as necessary for your logic
        value={activityType}
        items={[
          { label: 'Walking', value: 'walking' },
          { label: 'Running', value: 'running' },
          { label: 'Swimming', value: 'swimming' },
          { label: 'Weights', value: 'weights' },
          { label: 'Yoga', value: 'yoga' },
          { label: 'Cycling', value: 'cycling' },
          { label: 'Hiking', value: 'hiking' }
        ]}
        setValue={setActivityType}
        style={{ marginBottom: 10 }}
      />

      
      <Button title="Submit" onPress={() => { /* Add activity to context */ }} />
    </View>
  );
};

export default AddActivity;
