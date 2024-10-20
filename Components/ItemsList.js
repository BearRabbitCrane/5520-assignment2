// Components/ItemsList.js
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import commonStyles from '../Helpers/styles'; // Import common styles

// ItemsList component to display list items for both Activities and Diet
const ItemsList = ({ entries, type }) => {
  const renderItem = ({ item }) => (
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
            {new Date(item.date).toLocaleDateString('en-US', {
              weekday: 'short', // e.g., Mon
              year: 'numeric',
              month: 'short',  // e.g., Sep
              day: 'numeric',
            })}
          </Text>
        </View>
        <View style={[styles.infoBox, { width: 75 }]}>
          <Text style={styles.infoText}>
            {type === 'activity' ? `${item.duration} min` : `${item.calories} kcal`}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

// Define styles for the ItemsList component
const styles = StyleSheet.create({
  ...commonStyles, // Import shared/common styles
  entryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: commonStyles.primaryColor,
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
