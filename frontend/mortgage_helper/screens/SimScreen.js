import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {getBrokerByProvince} from '../api/broker';
import {useUserContext} from '../contexts/UserContext';

function SimScreen({navigation}) {
  const {user} = useUserContext();
  const hasData = user !== null;
  // const prov = hasData ? user.province : '';
  const prov = 'ON';

  const {data: brokersData} = useQuery(['brokers', prov], () => {
    getBrokerByProvince(prov);
  });

  console.log('Broker:', brokersData);
  //   if (!brokersData) {
  //     return <ActivityIndicator size="large" style={styles.spinner} />;
  //   }
  return (
    <View>
      <Text>{brokersData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default SimScreen;
