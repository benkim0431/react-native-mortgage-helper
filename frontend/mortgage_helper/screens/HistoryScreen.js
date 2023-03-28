import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';
import {getApplicationsByCid} from '../api/application';
import HistoryList from '../components/HistoryList';
import Avatar from '../components/Avatar';
import {useUserContext} from '../contexts/UserContext';
import useApplicationsByCid from '../hooks/useApplicationsByCid';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

function HistoryScreen({navigation}) {
  const {user} = useUserContext();
  // console.log('History:', user);
  const hasData = user !== null;
  const firstName = hasData ? user.firstName : '';
  const cid = user._id;
  const isFocused = useIsFocused();

  // if (isFocused) {
  // console.log("I'm here", isFocused);
  // }

  useEffect(() => {
    // const cid = '63f006302d0a20cc23b0ba48';
    navigation.setOptions({
      title: `Welcome ${firstName}`,
      headerStyle: {
        backgroundColor: '#14213D',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <View>
          {hasData ? (
            <Avatar style={styles.profile} source={user.photoURL} />
          ) : (
            <Avatar style={styles.profile} />
          )}
        </View>
      ),
    });
  }, [navigation, user]);

  const {data: historiesData, isLoading} = useApplicationsByCid(cid);

  // console.log('isLoading:', isLoading);
  // console.log('history data:', historiesData);

  if (!isFocused) {
    return <View style={styles.block} />;
  }

  if (!historiesData) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="#14213D" />
    );
  }
  // console.log('HIS:', historiesData.applications);
  return (
    <View style={styles.block}>
      <HistoryList histories={historiesData.applications} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#14213D',
  },
  spinner: {
    flex: 1,
  },
  profile: {
    marginVertical: 10,
  },
});

export default HistoryScreen;
