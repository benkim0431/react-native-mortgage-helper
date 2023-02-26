import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HistoryListItem from './HistoryListItem';

function HistoryList({histories}) {
  return (
    <FlatList
      data={histories}
      style={styles.block}
      renderItem={({item}) => <HistoryListItem history={item} />}
      keyExtractor={history => history._id.toString()}
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

export default HistoryList;
