import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BrokerListItem from './BrokerListItem';

function BrokerList({brokers}) {
  return (
    <FlatList
      data={brokers}
      style={styles.block}
      renderItem={({item}) => <BrokerListItem broker={item} />}
      keyExtractor={broker => broker._id.toString()}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
    />
  );
}

const styles = StyleSheet.create({
  block: {
    margin: 16,
    backgroundColor: '#14213D',
  },
  seperator: {
    backgroundColor: '#14213D',
    height: 16,
    width: '100%',
  },
});

export default BrokerList;