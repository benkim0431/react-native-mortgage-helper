import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useUserInfoById from '../hooks/useUserInfoById';

function HistoryListItem({history}) {
  // console.log(history);
  const {brokerId: id, lastModified, status, totalValue} = history;
  let brokerName = '';
  // console.log('brokerId', id);
  if (typeof id !== 'undefined') {
    const {data} = useUserInfoById(id);
    brokerName = data ? `${data.user.firstName} ${data.user.lastName}` : '';
  }

  const time = Date.parse(lastModified);
  const date = new Date(time);

  const value = Number(totalValue);

  return (
    <View style={styles.item}>
      <View style={styles.startBlock}>
        {brokerName ? (
          <Icon name="content-copy" size={60} color="#14213D" />
        ) : (
          <Icon name="calculate" size={60} color="#14213D" />
        )}
      </View>
      <View style={styles.centerBlock}>
        <View>
          <Text style={styles.date}>
            {date.toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
        <View style={styles.brokerBlock}>
          {brokerName ? (
            <>
              <Icon name="person" size={32} color="#14213D" />
              <Text style={styles.broker}>{brokerName}</Text>
            </>
          ) : (
            <>
              <Icon name="psychology" size={32} color="#14213D" />
              <Text style={styles.broker}>{'Automated'}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.endBlock}>
        <View>
          <Text style={styles.value}>${value.toLocaleString()}</Text>
        </View>
        <View style={styles.status}>
          {{
            OPEN: <Icon name="update" size={32} color="#14213D" />,
            APPROVED: <Icon name="check" size={32} color="#14213D" />,
            REJECTED: <Icon name="clear" size={32} color="#14213D" />,
          }[status] || <View style={styles.statusPlaceholder} />}
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
  startBlock: {
    width: 70,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  date: {
    color: '#14213D',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centerBlock: {
    width: 160,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  brokerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  broker: {
    color: '#14213D',
    fontSize: 15,
    fontWeight: 'bold',
  },
  endBlock: {
    flex: 1,
  },
  value: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: '#FCA311',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
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
