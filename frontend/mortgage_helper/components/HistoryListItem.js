import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HistoryListItem({history}) {
  console.log(history);
  const {brokerId, lastModified, status, totalValue} = history;
  const broker = 'q';
  return (
    <View style={styles.item}>
      <View style={styles.startBlock}>
        {broker ? (
          <Icon name="content-copy" size={60} color="#14213D" />
        ) : (
          <Icon name="calculate" size={60} color="#14213D" />
        )}
      </View>
      <View style={styles.centerBlock}>
        <View style={styles.date}>
          <Text>{lastModified}</Text>
        </View>
        <View style={styles.broker}>
          <Text>{brokerId}</Text>
        </View>
      </View>
      <View style={styles.endBlock}>
        <View>
          <Text style={styles.value}>{totalValue}</Text>
        </View>
        <View style={styles.status}>
          {status === 'OPEN' ? (
            <Icon name="update" size={32} color="#14213D" />
          ) : (
            <View style={styles.statusPlaceholder} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  date: {
    color: 'black',
    fontSize: 15,
  },
  centerBlock: {},
  endBlock: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  value: {
    color: '#FCA311',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusPlaceholder: {
    width: 32,
    height: 32,
  },
});

export default HistoryListItem;
