// Screens/Activities.js
import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import { ActivityContext } from '../Context/ActivityContext'; 
import ItemsList from '../Components/ItemsList'; // Import ItemsList
import commonStyles from '../Helpers/styles'; // Import common styles

const Activities = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext);
  const { activities } = useContext(ActivityContext); // Get activities from context

  // Set header and "Add" button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
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
      <ItemsList entries={activities} type="activity" /> 
    </View>
  );
};

// Define styles for the Activities component
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

export default Activities;
