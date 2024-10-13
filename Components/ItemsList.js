import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const ItemsList = ({ entries, type }) => {
  const renderItem = ({ item }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryNameContainer}>
        <Text style={styles.entryName}>
          {type === 'activity' ? item.activityType : item.description}  {/* Correctly display the name or description */}
        </Text>
        {item.isSpecial && <Text style={styles.specialIcon}>⚠️</Text>}
      </View>
      <View style={styles.entryInfo}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {new Date(item.date).toLocaleDateString()} {/* Format the date */}
          </Text>
        </View>
        <View style={styles.infoBox}>
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

const styles = StyleSheet.create({
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
    fontWeight: '500',
  },
  specialIcon: {
    marginLeft: 5,
    color: 'yellow',
    fontSize: 18,
  },
});

export default ItemsList;
