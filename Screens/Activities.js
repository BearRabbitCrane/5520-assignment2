import React, { useState } from 'react';
import { View, Button } from 'react-native';
import ItemsList from '../Components/ItemsList';

const Activities = ({ navigation }) => {
  // Local state to hold activity entries (use your actual data source later)
  const [activities] = useState([
    { id: 1, description: 'Running', duration: 30 },
    { id: 2, description: 'Swimming', duration: 45 },
    { id: 3, description: 'Cycling', duration: 60 },
  ]);

  return (
    <View style={{ flex: 1 }}>
      {/* Pass activities as a prop to ItemsList */}
      <ItemsList entries={activities} type="activity" />

      {/* Add button for navigating to the AddActivity screen */}
      <Button 
        title="Add"
        onPress={() => navigation.navigate('AddActivity')} 
      />
    </View>
  );
};

export default Activities;
