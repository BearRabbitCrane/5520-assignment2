import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ItemsList from '../Components/ItemsList';
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const Diet = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext); // Access theme context
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
      headerStyle: {
        backgroundColor: headerColor, // Use headerColor from ThemeContext
      },
      headerTitleStyle: {
        color: textColor, // Use textColor from ThemeContext
      },
    });
  }, [navigation, headerColor, textColor]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Diet Entries</Text>
      <ItemsList entries={dietEntries} type="diet" />
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Diet;
