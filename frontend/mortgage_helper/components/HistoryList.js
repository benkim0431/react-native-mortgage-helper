import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import HistoryListItem from './HistoryListItem';

function HistoryList({histories}) {
  return (
    <FlatList
      data={histories}
      style={styles.block}
      renderItem={({item}) => <HistoryListItem history={item} />}
      keyExtractor={history => history.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
    />
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  seperator: {
    backgroundColor: '#E0E0E0',
    height: 1,
    width: '100%',
  },
});

export default HistoryList;
