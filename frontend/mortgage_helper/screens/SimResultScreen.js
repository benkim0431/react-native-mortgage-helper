import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import {useUserContext} from '../contexts/UserContext';
import Avatar from '../components/Avatar';
import useApplicationsByCid from '../hooks/useApplicationsByCid';

function SimResultScreen({navigation, route}) {
  const {applicationId, housePhoto, totalValue} = route.params ?? {};
  const {user} = useUserContext();
  const hasData = user !== null;
  const cid = user._id;

  useEffect(() => {
    photoURL = hasData ? user.photoURL : '';
    navigation.setOptions({
      title: 'New Simulation',
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
  //   const {data: applicationsData} = useApplicationsByCid(cid);
  //   const openApplication = applicationsData.applications.filter(
  //     application => application.status === 'OPEN',
  //   )[0];
  const value = Number(totalValue);

  if (!applicationId) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="#14213D" />
    );
  }

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={styles.block}>
        <Image
          source={
            {
              House1: require(`../assets/images/House1.png`),
              House2: require(`../assets/images/House2.png`),
              House3: require(`../assets/images/House3.png`),
              House4: require(`../assets/images/House4.png`),
              House5: require(`../assets/images/House5.png`),
            }[housePhoto] || require(`../assets/images/House1.png`)
          }
          style={styles.image}
        />
        <Text style={styles.msg}>
          You might be qualified {'\n'}
          for a house up to
        </Text>
        <Text style={styles.price}>${value.toLocaleString()}</Text>
      </View>
      <View style={styles.button}>
        <CustomButton
          title="Submit Application to Broker"
          hasMarginBottom={true}
          onPress={() => {
            navigation.push('Broker');
          }}
        />
        <CustomButton
          title="Back to Home"
          hasMarginBottom={true}
          theme="secondary"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const HOUSE_IMAGES = {};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#14213D',
  },
  block: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: 292,
    height: 228,
    borderRadius: 15,
  },
  button: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  msg: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  price: {
    color: '#FCA311',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  profile: {
    marginVertical: 10,
  },
});

export default SimResultScreen;
