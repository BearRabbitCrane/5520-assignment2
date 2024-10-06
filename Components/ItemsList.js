import React from 'react';
import { FlatList, Text, View } from 'react-native';

const ItemsList = ({ entries, type }) => {
  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{item.name}</Text>
      <Text>{type === 'activity' ? `Duration: ${item.duration} mins` : `Calories: ${item.calories}`}</Text>
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

export default ItemsList;
