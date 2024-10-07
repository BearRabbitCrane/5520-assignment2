import React, { useState } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';

const Diet = ({ navigation }) => {
  // Local state to hold diet entries (use your actual data source later)
  const [dietEntries] = useState([
    { id: 1, description: 'Apple', calories: 95, date: new Date() },
    { id: 2, description: 'Banana', calories: 105, date: new Date() },
  ]);

  // Set the "Add" button with icons
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <Ionicons
            name="add-circle"
            size={28}
            color="green"
            onPress={() => navigation.navigate('AddDietEntry')}
            style={{ marginRight: 10 }}
          />
          <Ionicons
            name="fast-food"
            size={28}
            color="green"
            onPress={() => navigation.navigate('AddDietEntry')}
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ItemsList entries={dietEntries} type="diet" />
    </View>
  );
};

export default Diet;
