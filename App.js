import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // For icons

import Activities from './Screens/Activities';
import Diet from './Screens/Diet';
import AddActivity from './Screens/AddActivity';
import AddDietEntry from './Screens/AddDietEntry';
import Settings from './Screens/Settings'; // Import Settings screen
import { ThemeProvider } from './Context/ThemeContext'; // Import ThemeProvider

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Activities') {
            iconName = 'bicycle';
          } else if (route.name === 'Diet') {
            iconName = 'fast-food';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
      <Tab.Screen name="Settings" component={Settings} /> 
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AddActivity" component={AddActivity} options={{ title: 'Add Activity' }} />
      <Stack.Screen name="AddDietEntry" component={AddDietEntry} options={{ title: 'Add Diet Entry' }} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider> 
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
