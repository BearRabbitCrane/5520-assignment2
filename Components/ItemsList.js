import React from 'react';
import { FlatList } from 'react-native';
import EntryCard from './EntryCard';  // Import EntryCard

const ItemsList = ({ entries, type }) => {
  const renderItem = ({ item }) => (
    <EntryCard type={type} item={item} />  // Use the reusable EntryCard component
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
