import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import ItemsList from '../Components/ItemsList';
import commonStyles from '../Helpers/styles';
import { ThemeContext } from '../Context/ThemeContext';
import { listenToActivities, deleteActivityFromDB } from '../Firebase/firestoreHelper'; // Import Firestore helpers

const Activities = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext);
  const [activities, setActivities] = useState([]); // State to store activities data

  // Fetch activities in real-time from Firestore
  useEffect(() => {
    const unsubscribe = listenToActivities((data) => {
      setActivities(data); // Update the state with Firestore activities data
    });

    return () => unsubscribe(); // Clean up listener when component unmounts
  }, []);

  // Navigate to EditActivity screen
  const handleEditActivity = (activity) => {
    navigation.navigate('EditActivity', { activity }); // Pass activity data to EditActivity
  };

  // Delete an activity
  const handleDeleteActivity = async (activityId) => {
    try {
      await deleteActivityFromDB(activityId);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  // Set header with icons
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerIconsContainer}>
          <Pressable
            onPress={() => navigation.navigate('AddActivity')}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? commonStyles.secondaryColor : 'transparent',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              },
            ]}
          >
            <Ionicons name="add" size={24} color={commonStyles.whiteColor} />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('UserProfile')}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? commonStyles.secondaryColor : 'transparent',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              },
            ]}
          >
            <Ionicons name="bicycle" size={24} color={commonStyles.whiteColor} />
          </Pressable>
        </View>
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
        entries={activities} 
        type="activity" 
        onEdit={handleEditActivity}  // Pass edit function to ItemsList
        onDelete={handleDeleteActivity} // Pass delete function to ItemsList
      />
    </View>
  );
};

// Define styles for the Activities component
const styles = StyleSheet.create({
  ...commonStyles,
  container: {
    flex: 1,
    padding: 20,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Activities;
