import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import {useQuery} from 'react-query';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HistorySatck from './HistoryStack';
import {getUserByUuid} from '../api/user';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

const Tab = createBottomTabNavigator();

function MainTab({route}) {
  const {uuid, photoURL} = route.params ?? {};

  const {setUser} = useUserContext();

  const {data, isLoading, error} = useQuery(['userInfo', uuid], () =>
    getUserByUuid(uuid),
  );

  useEffect(() => {
    if (typeof data !== 'undefined') {
      data.message && setUser({...data.message, photoURL});
      // console.log('Context In:', data.message, photoURL);
    }
  }, [data]);

  if (!isLoading) {
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
          name="Simulation"
          component={HomeStack}
          options={{
            title: 'Simulation',
            tabBarIcon: ({color, size}) => (
              <Icon name="calculate" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
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
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default MainTab;
