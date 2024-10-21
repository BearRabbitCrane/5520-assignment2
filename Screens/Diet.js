import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import ItemsList from '../Components/ItemsList'; // Import ItemsList
import commonStyles from '../Helpers/styles'; // Import common styles
import { listenToDietEntries, deleteDietEntryFromDB } from '../Firebase/firestoreHelper'; // Import Firestore helpers

const Diet = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext);
  const [dietEntries, setDietEntries] = useState([]); // State to store diet entries data

  // Fetch diet entries in real-time from Firestore
  useEffect(() => {
    const unsubscribe = listenToDietEntries((data) => {
      setDietEntries(data); // Update the state with Firestore diet entries data
    });

    return () => unsubscribe(); // Clean up listener when component unmounts
  }, []);

  // Delete a diet entry
  const handleDeleteDietEntry = async (entryId) => {
    try {
      await deleteDietEntryFromDB(entryId);
    } catch (error) {
      console.error('Error deleting diet entry:', error);
    }
  };

  // Set header and "Add" button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('AddDietEntry')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? commonStyles.secondaryColor : 'transparent',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            },
          ]}
        >
          <Text style={styles.addButton}>Add</Text>
        </Pressable>
      ),
      headerStyle: {
        backgroundColor: headerColor,
      },
      headerTitleStyle: {
        color: textColor,
      },
    });
  }, [navigation, headerColor, textColor]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ItemsList 
        entries={dietEntries} 
        type="diet" 
        onDelete={handleDeleteDietEntry} // Pass delete function to ItemsList
      />
    </View>
  );
};

// Define styles for the Diet component
const styles = StyleSheet.create({
  ...commonStyles, // Use shared styles
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    fontSize: 16,
    color: commonStyles.whiteColor,
  },
});

export default Diet;
