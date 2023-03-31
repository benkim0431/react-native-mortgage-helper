import React, {useState} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQuery} from 'react-query';
import {setUserTypeByUuid} from '../api/user';
import {useUserContext} from '../contexts/UserContext';
import {getUserByUuid} from '../api/user';
import ClientButtons from '../components/Button';
import BrokerButtons from '../components/Button';
import ProvinceDropdown from '../components/ProvinceDropdown';

function UserTypeScreen({navigation, route}) {
  const {uuid, isBroker} = route.params ?? {};

  const {setUser} = useUserContext();
  const {data, isLoading, error} = useQuery(
    ['userInfoByUuid', uuid],
    () => getUserByUuid(uuid),
    {
      onSuccess: data => {
        console.log('data:' + data.user.type);
        if (typeof data !== 'undefined') {
          data.user && setUser({...data.user});
          if (data.user.type) {
            navigation.navigate('MainTab');
          }
        }
      },
    },
  );

  const {mutate: setUserType} = useMutation(setUserTypeByUuid, {
    onSuccess: () => {
      console.log('setUserTypeByUuid type update success');
    },
  });

  const onSubmitClient = () => {
    // console.log("onSubmitClient");
    const userType = 'Client';
    // console.log(typeof(client));
    setUserType({uuid, userType});
    navigation.navigate('MainTab');
  };

  const onSubmitBroker = () => {
    // console.log("onSubmitBroker");
    // const userType = 'Broker';
    // setUserType({uuid, userType});
    navigation.navigate('UserType', {uuid: uuid, isBroker: true});
  };

  return isLoading ? (
    <ActivityIndicator size="large" style={styles.spinner} color="#E5E5E5" />
  ) : data.user.type ? (
    <SafeAreaView style={styles.fullscreen} />
  ) : (
    <SafeAreaView style={styles.fullscreen}>
      <Text style={styles.text}>Before starting, </Text>
      <Text style={styles.text}>you must inform if you are:</Text>
      {isBroker ? (
        <ProvinceDropdown />
      ) : (
        <View style={styles.button}>
          <ClientButtons name="Client" onSubmit={onSubmitClient} />
        </View>
      )}
      <View style={styles.button}>
        <BrokerButtons name={'Broker'} onSubmit={onSubmitBroker} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14213D',
  },
  text: {
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    width: '50%',
    paddingHorizontal: 16,
  },
  spinner: {
    flex: 1,
    backgroundColor: '#14213D',
  },
});

export default UserTypeScreen;
