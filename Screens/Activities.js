import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';

const Activities = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext); // Access the theme context

  const [activities] = useState([
    { id: 1, name: 'Yoga', duration: 60, date: 'Mon Sep 16 2024' },
    { id: 2, name: 'Weights', duration: 120, date: 'Mon Jul 15 2024', isSpecial: true },
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('AddActivity')}
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
      {activities.map(activity => (
        <View key={activity.id} style={styles.activityCard}>
          <View style={styles.activityNameContainer}>
            <Text style={[styles.activityName, { color: textColor }]}>{activity.name}</Text>
            {activity.isSpecial && <Text style={styles.specialIcon}>⚠️</Text>}
          </View>
          <View style={styles.activityInfo}>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{activity.date}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{activity.duration} min</Text>
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
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4527a0',
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
  activityName: {
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

export default Activities;
