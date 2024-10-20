// Screens/Diet.js
import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import { DietContext } from '../Context/DietContext'; // Import DietContext
import ItemsList from '../Components/ItemsList'; // Import ItemsList
import commonStyles from '../Helpers/styles'; // Import common styles

const Diet = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext);
  const { dietEntries } = useContext(DietContext); // Access diet entries from context

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
      <ItemsList entries={dietEntries} type="diet" /> 
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
