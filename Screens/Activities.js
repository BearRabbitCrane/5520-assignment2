import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import ItemsList from '../Components/ItemsList';
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const Activities = ({ navigation }) => {
  const { backgroundColor, textColor } = useContext(ThemeContext); // Access the theme context

  const [activities] = useState([
    { id: 1, name: 'Running', duration: 45 },
    { id: 2, name: 'Swimming', duration: 30 },
    { id: 3, name: 'Cycling', duration: 60 },
  ]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>Activities</Text>
      <ItemsList entries={activities} type="activity" />
      <Button title="Add" onPress={() => navigation.navigate('AddActivity')} />
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

export default Activities;
