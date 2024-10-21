import React from 'react';
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import commonStyles from '../Helpers/styles';  // Assuming you have common styles

const ItemsList = ({ entries, type, onEdit }) => {
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
              {new Date(item.date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
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
    </Pressable>
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
