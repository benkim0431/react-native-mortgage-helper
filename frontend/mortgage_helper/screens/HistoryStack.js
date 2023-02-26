import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HistoryScreen from './HistoryScreen';

const Stack = createNativeStackNavigator();

function HistorySatck() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryHome"
        component={HistoryScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default HistorySatck;
