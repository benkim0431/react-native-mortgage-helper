import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';
import {getApplicationsByCid} from '../api/application';
import HistoryList from '../components/HistoryList';

function HistoryScreen() {
  const cid = '63f006302d0a20cc23b0ba48';
  const {data: historiesData} = useQuery(['histories', cid], () =>
    getApplicationsByCid(cid),
  );

  if (!historiesData) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="#14213D" />
    );
  }
  console.log('HIS:', historiesData.applications);
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
});

export default HistoryScreen;
