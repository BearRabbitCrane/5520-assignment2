import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // For icons

import Activities from './Screens/Activities'; // Activity screen
import Diet from './Screens/Diet'; // Diet screen
import AddActivity from './Screens/AddActivity'; // AddActivity screen
import AddDietEntry from './Screens/AddDietEntry'; // AddDietEntry screen

// Create the Stack and Tab Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Activity and Diet screens
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Activities') {
            iconName = 'bicycle'; // Icon for Activity tab
          } else if (route.name === 'Diet') {
            iconName = 'fast-food'; // Icon for Diet tab
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
    </Tab.Navigator>
  );
};

// Stack Navigator for handling "AddActivity" and "AddDietEntry" screens
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* Main Tab Navigation */}
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }} // Hide header for the tab navigation
      />

      {/* Add Activity Screen */}
      <Stack.Screen
        name="AddActivity"
        component={AddActivity}
        options={{ title: 'Add Activity' }} // Set a title for AddActivity screen
      />

      {/* Add Diet Entry Screen */}
      <Stack.Screen
        name="AddDietEntry"
        component={AddDietEntry}
        options={{ title: 'Add Diet Entry' }} // Set a title for AddDietEntry screen
      />
    </Stack.Navigator>
  );
};

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
