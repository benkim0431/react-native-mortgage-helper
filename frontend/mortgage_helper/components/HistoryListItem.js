import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

function HistoryListItem({history}) {
  console.log(history);
  const {date, title, body, amount} = history;

  return (
    <Pressable style={styles.block}>
      <Text>{date}</Text>
      <Text>{title}</Text>
      <Text>{body}</Text>
      <Text>{amount}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
  },
  date: {
    color: 'black',
    fontSize: 15,
  },
  title: {},
  body: {},
  amount: {},
});

export default HistoryListItem;
