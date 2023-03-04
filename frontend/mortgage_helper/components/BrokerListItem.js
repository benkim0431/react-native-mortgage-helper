import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import useUserInfoById from '../hooks/useUserInfoById';
import Avatar from './Avatar';

function BrokerListItem({broker}) {
  const {userId: id} = broker;
  let brokerName = '',
    photoURL = '';
  const {data} = useUserInfoById(id);
  brokerName = data ? `${data.user.firstName} ${data.user.lastName}` : '';
  photoURL = data ? data.user.photoURL : '';
  //   console.log('brokerInfo', data);

  if (!data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="#14213D" />
    );
  }
  return (
    <View style={styles.item}>
      <View style={styles.startBlock}>
        {photoURL ? (
          <Avatar style={styles.profile} size={45} source={photoURL} />
        ) : (
          <Avatar style={styles.profile} size={45} />
        )}
      </View>
      <View style={styles.endBlock}>
        <Text style={styles.broker}>{brokerName}</Text>
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
    height: 50,
    width: 70,
  },
  endBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  broker: {
    color: '#14213D',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profile: {},
});

export default BrokerListItem;
