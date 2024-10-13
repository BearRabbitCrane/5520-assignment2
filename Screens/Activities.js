import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import { ActivityContext } from '../Context/ActivityContext'; // Assuming you have this context
import ItemsList from '../Components/ItemsList'; // Import ItemsList

const Activities = ({ navigation }) => {
  const { backgroundColor, textColor, headerColor } = useContext(ThemeContext);
  const { activities } = useContext(ActivityContext); // Get activities from context

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('AddActivity')}
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
      <ItemsList entries={activities} type="activity" /> 
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

export default Activities;
