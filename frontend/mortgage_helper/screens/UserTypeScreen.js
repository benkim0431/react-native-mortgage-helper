import React, {useState} from 'react';
import {Text, StyleSheet, View, ActivityIndicator, Alert} from 'react-native';
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
import BrokerInfoForm from '../components/BrokerInfoForm';
import {useDispatch, useSelector} from 'react-redux';
import {
  borkerProvinceSetValue,
  brokerCompanySetValue,
  brokerPercentFeeSetValue,
} from '../modules/brokerInfo';

function UserTypeScreen({navigation, route}) {
  const {uuid, isBroker} = route.params ?? {};

  const {setUser} = useUserContext();
  const [type, setType] = useState();
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
            setType(data.user.type);
            if (data.user.type) {
              navigation.navigate('MainTab');
            }
          }
        }
      },
    },
  );

  const dispatch = useDispatch();
  const brokerInfo = useSelector(state => state.brokerInfo);
  const onValueChange = ({name, itemValue}) => {
    switch (name) {
      case 'province':
        // setProvince(itemValue);
        dispatch(borkerProvinceSetValue(itemValue));
        break;
      default:
        break;
    }
  };

  const createChangeTextHandler = name => value => {
    switch (name) {
      case 'brokerCompanyName':
        dispatch(brokerCompanySetValue(value));
        break;
      case 'brokerPercentageFee':
        dispatch(brokerPercentFeeSetValue(value));
        break;
      default:
        break;
    }
  };
  const validateBrokerForm = () => {
    if (brokerInfo.brokerCompanyName === '') {
      Alert.alert('Fail', 'Input company filed.');
      return false;
    }
    if (brokerInfo.percentageFee === '' || brokerInfo.percentageFee === '0') {
      Alert.alert('Fail', 'Input percentage filed.');
      return false;
    }
    return true;
  };

  const {mutate: setUserType} = useMutation(setUserTypeByUuid, {
    onSuccess: data => {
      // console.log('data:', data);
      if (data.type === 'Client') addClient({userId});
      if (data.type === 'Broker')
        if (validateBrokerForm()) {
          addBroker({
            userId,
            companyName: brokerInfo.brokerCompanyName,
            percentageFee: brokerInfo.brokerPercentageFee,
            province: brokerInfo.brokerProvince,
          });
        }
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

  // const [province, setProvince] = useState('AB');

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
  ) : type ? (
    <SafeAreaView style={styles.fullscreen} />
  ) : (
    <SafeAreaView style={styles.fullscreen}>
      {isBroker ? (
        <>
          <View style={styles.block}>
            <Text style={styles.text}>Tell us more about yourself:</Text>
            <View style={styles.form}>
              <BrokerInfoForm
                brokerInfo={brokerInfo}
                createChangeTextHandler={createChangeTextHandler}
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
    height: 400,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30,
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
  form: {
    flex: 1,
    width: '100%',
  },
});

export default UserTypeScreen;
