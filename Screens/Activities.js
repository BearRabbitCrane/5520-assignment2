import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { ThemeContext } from '../Context/ThemeContext'; // Import ThemeContext

const Activities = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext); // Access the theme context

  // Sample activities (replace with context data if needed)
  const [activities] = useState([
    { id: 1, name: 'Yoga', duration: 60, date: 'Mon Sep 16 2024' },
    { id: 2, name: 'Weights', duration: 120, date: 'Mon Jul 15 2024', isSpecial: true },
  ]);

  // Set "Add" button to the top right and customize header style
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('AddActivity')}>
          <Text style={styles.addButton}>Add</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: headerColor, // Dark purple background for header from ThemeContext
      },
      headerTitleStyle: {
        color: textColor, // Use textColor from ThemeContext
      },
    });
  }, [navigation, headerColor, textColor]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {activities.map(activity => (
        <View key={activity.id} style={styles.activityCard}>
          <View style={styles.activityNameContainer}>
            <Text style={[styles.activityName, { color: textColor }]}>{activity.name}</Text>
            {activity.isSpecial && <Ionicons name="warning" size={18} color="yellow" style={styles.specialIcon} />}
          </View>
          <View style={styles.activityInfo}>
            <Text style={[styles.activityDate, { color: textColor }]}>{activity.date}</Text>
            <Text style={[styles.activityDuration, { color: textColor }]}>{activity.duration} min</Text>
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
  addButton: {
    fontSize: 18,
    color: '#1E90FF', // Blue for the "Add" button
    marginRight: 15,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4527a0', // Darker purple for activity cards
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  activityNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDate: {
    fontSize: 14,
    marginRight: 10, // Add space between date and duration
  },
  activityDuration: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Activities;
