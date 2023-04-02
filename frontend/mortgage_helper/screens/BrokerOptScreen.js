import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {getAllBrokers} from '../api/brokerUser';
import BrokerList from '../components/BrokerList';
import {useUserContext} from '../contexts/UserContext';
import Avatar from '../components/Avatar';
import {useSelector} from 'react-redux';

function BrokerOptScreen(props) {
  const navigation = props.navigation;
  const applicationId = props.route.params.applicationId;
  const {user} = useUserContext();
  const [brokers, setBrokers] = useState([]);
  const hasData = user !== null;
  // const prov = 'ON';
  const prov = useSelector(state => state.basicInfo.address.province);

  const fetchAllBrokers = async () => {
    const result = await getAllBrokers();
    setBrokers(result.broker);
  };

  useEffect(() => {
    fetchAllBrokers();
    photoURL = hasData ? user.photoURL : '';
    navigation.setOptions({
      title: 'Choose a Broker',
      headerStyle: {
        backgroundColor: '#14213D',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <View>
          {hasData ? (
            <Avatar style={styles.profile} source={user.photoURL} />
          ) : (
            <Avatar style={styles.profile} />
          )}
        </View>
      ),
    });
  }, [navigation, user]);

  if (!brokers) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  const returnToHomePage = () => {
    navigation.pop(2);
  };

  return (
    <View style={styles.block}>
      <BrokerList
        brokers={brokers}
        applicationId={applicationId}
        returnToHomePage={returnToHomePage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#14213D',
  },
  spinner: {
    flex: 1,
  },
  profile: {
    marginVertical: 10,
  },
});

export default BrokerOptScreen;
