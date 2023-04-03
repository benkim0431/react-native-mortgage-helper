import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Text, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useUserInfoById from '../hooks/useUserInfoById';

function HistoryListItem({history}) {
  //console.log("history -> ", history);
  const navigation = useNavigation();
  const {broker: broker, lastModified, status, totalValue} = history;
  let brokerName = '';
  let brokerUserId = broker?._id;
  //console.log('brokerId', brokerUserId);
  if (typeof brokerUserId !== 'undefined') {
    const {data} = useUserInfoById(brokerUserId);
    brokerName = data ? `${data.user.firstName} ${data.user.lastName}` : '';
  }

  const time = Date.parse(lastModified);
  const date = new Date(time);

  const value = Number(totalValue);

  const onPress = () => {
    navigation.navigate('Application', {application: history});
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.item,
        Platform.OS === 'ios' && pressed && {opacity: 0.5},
      ]}
      android_ripple={{color: '#E5E5E5'}}>
      {/* <View style={styles.item}> */}
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
      {/* </View> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#14213D',
  },
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
