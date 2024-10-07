import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // For icons

import Activities from './Screens/Activities'; // Your Activity screen
import AddActivity from './Screens/AddActivity'; // Add Activity screen

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
          if (route.name === 'Activity') {
            iconName = 'bicycle'; // Example icon for Activity screen
          } else if (route.name === 'Diet') {
            iconName = 'fast-food'; // Example icon for Diet screen
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Diet" component={Diet} />
    </Tab.Navigator>
  );
};

// Stack Navigator for adding screens like AddActivity
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AddActivity" component={AddActivity} options={{ title: 'Add Activity' }} />
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
