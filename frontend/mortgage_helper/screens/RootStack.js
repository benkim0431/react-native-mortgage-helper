import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import MainTab from './MainTab';
import SimScreen from './SimScreen';
import ProfileScreen from './ProfileScreen';
import UserTypeScreen from './UserTypeScreen';
import BrokerOptScreen from './BrokerOptScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserType"
        component={UserTypeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Simulation" component={SimScreen} />
      <Stack.Screen name="Broker" component={BrokerOptScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
