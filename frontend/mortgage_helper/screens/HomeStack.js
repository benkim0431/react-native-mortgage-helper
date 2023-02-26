import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import SimScreen from './SimScreen';
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{}} />
      <Stack.Screen name="Simulation" component={SimScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
