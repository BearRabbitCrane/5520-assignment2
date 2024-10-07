import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from './Screens/Activities';
import AddActivity from './Screens/AddActivity'; // You'll add this later
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For icons

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Activities') {
          iconName = 'bicycle'; // Add appropriate icon
        } else if (route.name === 'Diet') {
          iconName = 'fast-food'; // Add appropriate icon
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Activities" component={Activities} />
    <Tab.Screen name="Diet" component={Diet} />
  </Tab.Navigator>
);

const AppNavigator = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="AddActivity" component={AddActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );

export default AppNavigator;