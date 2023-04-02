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
import CustomButton from '../components/CustomButton';
import {setBroker} from '../api/brokerUser';
import {setClient} from '../api/clientUser';

function UserTypeScreen({navigation, route}) {
  const {uuid, isBroker} = route.params ?? {};

  const {setUser} = useUserContext();
  const [userId, setUserId] = useState();
  const {data, isLoading, error} = useQuery(
    ['userInfoByUuid', uuid],
    () => getUserByUuid(uuid),
    {
      onSuccess: data => {
        // console.log('data:', data.user);
        if (typeof data !== 'undefined') {
          if (data.user) {
            setUser({...data.user});
            setUserId(data.user._id);
            if (data.user.type) {
              navigation.navigate('MainTab');
            }
          }
        }
      },
    },
  );

  const {mutate: setUserType} = useMutation(setUserTypeByUuid, {
    onSuccess: data => {
      // console.log('data:', data);
      if (data.type === 'Client') addClient({userId});
      if (data.type === 'Broker') addBroker({userId, province});
    },
  });

  const {mutate: addBroker} = useMutation(setBroker, {
    onSuccess: () => {
      navigation.navigate('MainTab');
    },
  });

  const {mutate: addClient} = useMutation(setClient, {
    onSuccess: () => {
      navigation.navigate('MainTab');
    },
  });

  const [province, setProvince] = useState('AB');

  const onValueChange = ({name, itemValue}) => {
    switch (name) {
      case 'province':
        setProvince(itemValue);
        break;
      default:
        break;
    }
  };

  const onSubmitClient = () => {
    // console.log("onSubmitClient");
    const userType = 'Client';
    // console.log(typeof(client));
    setUserType({uuid, userType});
  };

  const onSubmitBroker = () => {
    // console.log("onSubmitBroker");
    // const userType = 'Broker';
    // setUserType({uuid, userType});
    navigation.navigate('UserType', {uuid: uuid, isBroker: true});
  };

  const onNext = () => {
    const userType = 'Broker';
    setUserType({uuid, userType});
  };

  return isLoading ? (
    <ActivityIndicator size="large" style={styles.spinner} color="#E5E5E5" />
  ) : data.user.type ? (
    <SafeAreaView style={styles.fullscreen} />
  ) : (
    <SafeAreaView style={styles.fullscreen}>
      {isBroker ? (
        <>
          <View style={styles.block}>
            <Text style={styles.text}>Select your province:</Text>
            <View style={styles.dropdown}>
              <ProvinceDropdown
                province={province}
                onValueChange={onValueChange}
              />
            </View>
          </View>
          <View style={styles.button}>
            <CustomButton title="Next" onPress={onNext} />
          </View>
        </>
      ) : (
        <>
          <Text
            style={
              styles.text
            }>{`Before starting,\nyou must inform if you are:`}</Text>
          <View style={styles.button}>
            <ClientButtons name="Client" onSubmit={onSubmitClient} />
          </View>
          <View style={styles.button}>
            <BrokerButtons name="Broker" onSubmit={onSubmitBroker} />
          </View>
        </>
      )}
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
  block: {
    width: '100%',
    height: 150,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    paddingLeft: 30,
    paddingRight: 30,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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
  dropdown: {
    width: '100%',
  },
});

export default UserTypeScreen;
