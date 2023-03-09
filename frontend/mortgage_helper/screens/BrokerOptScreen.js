import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {getBrokerByProvince} from '../api/broker';
import BrokerList from '../components/BrokerList';
import {useUserContext} from '../contexts/UserContext';
import Avatar from '../components/Avatar';

function BrokerOptScreen({navigation}) {
  const {user} = useUserContext();
  const hasData = user !== null;
  // const prov = hasData ? user.province : '';
  const prov = 'ON';

  useEffect(() => {
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

  const {data: brokersData} = useQuery(['brokers', prov], () =>
    getBrokerByProvince(prov),
  );

  //   console.log('Broker:', brokersData);
  if (!brokersData) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }
  return (
    <View style={styles.block}>
      <BrokerList brokers={brokersData.broker} />
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
