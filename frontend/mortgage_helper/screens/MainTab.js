import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import {useQuery} from 'react-query';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HistorySatck from './HistoryStack';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#14213D',
        tabBarInactiveBackgroundColor: '#14213D',
        tabBarActiveTintColor: '#FCA311',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarLabelPosition: 'beside-icon',
      }}>
      <Tab.Screen
        name="SimulationTab"
        component={HomeStack}
        options={{
          title: 'Simulation',
          tabBarIcon: ({color, size}) => (
            <Icon name="calculate" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistorySatck}
        options={{
          title: 'History',
          tabBarIcon: ({color, size}) => (
            <Icon name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default MainTab;
