import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import Avatar from './Avatar';

function BrokerListItem(props) {
  const {broker, applicationId} = props
  const brokerName = broker ? `${broker.firstName} ${broker.lastName}` : '';
  const photoURL = broker.photoURL || '';

  const handleTouch = () => {
    //call api modifying application to add broker
    //trigger notification from firebase to the broker
    //send user back to home screen
    //show confirmation toast
    console.log("APPLICATION ID = ", applicationId)
  }

  return !broker ?
    <ActivityIndicator size="large" style={styles.spinner} color="#14213D" /> :
    <View style={styles.item}
      onStartShouldSetResponder={ handleTouch }>
      <View style={styles.startBlock}>
        {photoURL ? (
          <Avatar style={styles.profile} size={50} source={photoURL} />
        ) : (
          <Avatar style={styles.profile} size={50} />
        )}
      </View>
      <View style={styles.endBlock}>
        <Text style={styles.broker}>{brokerName}</Text>
      </View>
    </View>;
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
