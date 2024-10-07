import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';
import { DietContext } from '../context/DietContext'; // Assuming you are using Context

const Diet = ({ navigation }) => {
  const { dietEntries } = useContext(DietContext);

  // Set the "Add" button with icons
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Ionicons
            name="add-circle"
            size={28}
            color="green"
            onPress={() => navigation.navigate('AddDietEntry')}
          />
          <Ionicons
            name="fast-food"
            size={28}
            color="green"
            onPress={() => navigation.navigate('AddDietEntry')}
          />
        </>
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
