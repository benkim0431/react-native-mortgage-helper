import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HistoryList from '../components/HistoryList';

function HistoryScreen() {
  const [histories, setHistories] = useState([
    {
      id: 0,
      date: '2022-01-12',
      title: 'Jerena',
      body: 'Test1',
      amount: '400,000,000',
    },
    {
      id: 1,
      date: '2022-05-21',
      title: 'Jerena',
      body: 'Test1',
      amount: '700,000,000',
    },
    {
      id: 2,
      date: '2022-11-04',
      title: 'Jerena',
      body: 'Test1',
      amount: '90,000,000',
    },
  ]);
  return (
    <View style={styles.block}>
      <HistoryList histories={histories} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default HistoryScreen;
