import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const Diet = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext); // Access theme context

  const [dietEntries] = useState([
    { id: 1, description: 'Apple', calories: 95, date: 'Tue Sep 17 2024' },
    { id: 2, description: 'Lunch', calories: 900, date: 'Wed Sep 25 2024', isSpecial: true },
  ]);

  // Set the "Add" button to the top right and customize header style
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('AddDietEntry')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#1E90FF' : 'transparent', // Blue background when pressed
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            },
          ]}
        >
          <Text style={styles.addButton}>
            Add
          </Text>
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: headerColor, // Set header background color
      },
      headerTitleStyle: {
        color: textColor, // Set header text color
      },
    });
  }, [navigation, headerColor, textColor]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {dietEntries.map(entry => (
        <View key={entry.id} style={styles.entryCard}>
          <View style={styles.entryNameContainer}>
            <Text style={[styles.entryName, { color: textColor }]}>{entry.description}</Text>
            {entry.isSpecial && <Text style={styles.specialIcon}>⚠️</Text>}
          </View>
          <View style={styles.entryInfo}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{entry.date}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{entry.calories} kcal</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  entryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4527a0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  entryNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  infoText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  entryName: {
    fontSize: 18,
    color: '#ffffff',
  },
  specialIcon: {
    marginLeft: 5,
    color: 'yellow',
    fontSize: 18,
  },
  addButton: {
    fontSize: 16,
    color: '#ffffff', 
  },
});

export default Diet;
