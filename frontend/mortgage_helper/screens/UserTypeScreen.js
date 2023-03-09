import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQuery} from 'react-query';
import {setUserTypeByUuid} from '../api/user';


import ClientButtons from '../components/Button';
import BrokerButtons from '../components/Button';

function UserTypeScreen({navigation, route}) {

const {uuid} = route.params ?? {};

const {mutate: setUserType} = useMutation(setUserTypeByUuid, {
  onSuccess: () => {
    console.log('setUserTypeByUuid type update success');
  },
});

const onSubmitClient = () => {
    console.log("onSubmitClient");
    const userType = 'Client';
    console.log(typeof(client));
    setUserType({uuid, userType});
    navigation.navigate('MainTab', {uuid: uuid});
};

const onSubmitBroker = () => {
  console.log("onSubmitBroker");
  const userType = 'Broker';
  setUserType({uuid, userType});
  navigation.navigate('MainTab', {uuid: uuid});
};

return (
    <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>
            Before starting, </Text>
        <Text style={styles.text}> 
            you must inform if you are:</Text>
        <View style={styles.button}>
            <ClientButtons
                name="Client"
                onSubmit={onSubmitClient}
            />
        </View>
        <View style={styles.button}>
            <BrokerButtons
                name={'Borker'}
                onSubmit={onSubmitBroker}
            />
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
});

export default UserTypeScreen;
