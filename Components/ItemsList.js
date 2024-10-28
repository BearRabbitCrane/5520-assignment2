import React from 'react';
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import commonStyles from '../Helpers/styles';  // Assuming you have common styles

// Helper function to format the date with day and avoid timezone issues
const formatDateWithoutTimezoneIssue = (date) => {
  const parsedDate = new Date(date);
  
  // This ensures the correct formatting (e.g., Fri, Oct 11, 2024)
  return parsedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC', // Ensure it interprets the date as UTC
  });
};

const ItemsList = ({ entries, type, onEdit }) => {
  console.log('Rendering ItemsList with entries:', entries);  // Log the entries passed to ItemsList
  const renderItem = ({ item }) => (
    <Pressable onPress={() => onEdit(item)} style={styles.pressableItem}>
      <View style={styles.entryCard}>
        <View style={styles.entryNameContainer}>
          <Text style={styles.entryName}>
            {type === 'activity' ? item.activityType : item.description}
          </Text>
          {item.isSpecial && <Text style={styles.specialIcon}>⚠️</Text>}
        </View>
        <View style={styles.entryInfo}>
          <View style={[styles.infoBox, { width: 145 }]}>
            <Text style={styles.infoText}>
              {formatDateWithoutTimezoneIssue(item.date)} {/* Correctly format the date */}
            </Text>
          </View>
          <View style={[styles.infoBox, { width: 75 }]}>
            <Text style={styles.infoText}>
              {type === 'activity' ? `${item.duration} min` : `${item.calories} kcal`}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}  // Make sure each entry has a unique ID
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  pressableItem: {
    marginBottom: 10,
  },
  entryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: commonStyles.primaryColor,
    borderRadius: 8,
    padding: 15,
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
    backgroundColor: commonStyles.whiteColor,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  infoText: {
    color: commonStyles.blackColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
  entryName: {
    fontSize: 16,
    color: commonStyles.whiteColor,
    fontWeight: '500',
  },
  specialIcon: {
    marginLeft: 5,
    color: 'yellow',
    fontSize: 18,
  },
});

export default ItemsList;
