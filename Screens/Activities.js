import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ActivityContext } from '../context/ActivityContext'; 

const Activities = ({ navigation }) => {
  const { activities } = useContext(ActivityContext);

  return (
    <View style={{ flex: 1 }}>
      <ItemsList entries={activities} type="activity" />
      <Button 
        title="Add"
        onPress={() => navigation.navigate('AddActivity')} 
      />
    </View>
  );
};

export default Activities;
