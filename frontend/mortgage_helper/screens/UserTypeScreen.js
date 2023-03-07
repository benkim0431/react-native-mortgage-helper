import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ClientButtons from '../components/Button';
import BrokerButtons from '../components/Button';

function UserTypeScreen({navigation, route}) {

const {uuid} = route.params ?? {};

const onSubmit = () => {
    console.log("Test");
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
                onSubmit={onSubmit}
            />
        </View>
        <View style={styles.button}>
            <BrokerButtons
                name={'Borker'}
                onSubmit={onSubmit}
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
