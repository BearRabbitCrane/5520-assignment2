import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import { DietContext } from '../Context/DietContext'; // Import DietContext
import ItemsList from '../Components/ItemsList'; // Import ItemsList

const Diet = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext); // Access theme context
  const { dietEntries } = useContext(DietContext); // Access dietEntries from DietContext

  // Set the "Add" button to the top right and customize header style
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('AddDietEntry')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#1E90FF' : 'transparent',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default Diet;
