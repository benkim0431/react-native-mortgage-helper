import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import MainTab from './MainTab';
import SimResultScreen from './SimResultScreen';
import ProfileScreen from './ProfileScreen';
import UserTypeScreen from './UserTypeScreen';
import BrokerOptScreen from './BrokerOptScreen';
import SimReqScreen from './SimReqScreen';
import ApplicationScreen from './ApplicationScreen';
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
      <Stack.Screen name="SimRequest" component={SimReqScreen} />
      <Stack.Screen name="Broker" component={BrokerOptScreen} />
      <Stack.Screen name="Application" component={ApplicationScreen} />
      <Stack.Screen name="SimResult" component={SimResultScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
