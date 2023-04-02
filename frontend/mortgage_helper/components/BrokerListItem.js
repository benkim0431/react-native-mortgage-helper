import React from 'react';
import {useMutation} from 'react-query';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Avatar from './Avatar';
import {editApplicationById} from '../api/application';

function BrokerListItem(props) {
  const {broker, applicationId, returnToHomePage} = props;
  const brokerName = broker.userId ? `${broker.userId.firstName} ${broker.userId.lastName}` : '';
  const photoURL = broker.photoURL || '';

  const {mutate: addBrokerToApplication} = useMutation(editApplicationById, {
    onSuccess: data => {
      // console.log('added broker to application ', data);
      returnToHomePage();
      toastBrokerAddedMessage();
      //trigger notification from firebase to the broker
    },
  });

  const toastBrokerAddedMessage = () => {
    ToastAndroid.showWithGravity(
      'Your application is under analysis.',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  const handleTouch = () => {
    addBrokerToApplication({
      applicationId,
      brokerId: broker.userId._id,
      status: 'OPEN',
    });
  };

  return !broker ? (
    <ActivityIndicator size="large" style={styles.spinner} color="#14213D" />
  ) : (
    <View style={styles.item} onStartShouldSetResponder={handleTouch}>
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
