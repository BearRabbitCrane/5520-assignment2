import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Activities from './Screens/Activities';
import Diet from './Screens/Diet';
import AddActivity from './Screens/AddActivity';
import AddDietEntry from './Screens/AddDietEntry';
import EditActivity from './Screens/EditActivity';
import Settings from './Screens/Settings';
import { ActivityProvider } from './Context/ActivityContext'; // Import ActivityProvider
import { DietProvider } from './Context/DietContext';
import { ThemeProvider } from './Context/ThemeContext';

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
        tabBarActiveTintColor: '#1E90FF', // Active icon text color
        tabBarInactiveTintColor: '#ffffff', // Inactive icon text color
        tabBarStyle: {
          backgroundColor: '#4527a0', // Dark purple background for the tab bar
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
      <Stack.Screen name="EditActivity" component={EditActivity}  options={{ title: 'Edit Activity' }} 
/>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider> 
      <DietProvider> 
        <ActivityProvider> 
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </ActivityProvider>
      </DietProvider>
    </ThemeProvider>
  );
}
