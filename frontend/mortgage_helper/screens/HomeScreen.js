import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import CustomButton from '../components/CustomButton';
import Avatar from '../components/Avatar';
import {useUserContext} from '../contexts/UserContext';

function HomeScreen({navigation}) {
  const {user} = useUserContext();
  const hasData = user !== null;
  const firstName = hasData ? user.firstName : '';

  useEffect(() => {
    navigation.setOptions({
      title: `Welcome ${firstName}`,
      headerStyle: {
        backgroundColor: '#14213D',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <View>
          <Pressable onPress={onOpenProfile}>
            {hasData ? (
              <Avatar style={styles.profile} source={user.photoURL} />
            ) : (
              <Avatar style={styles.profile} />
            )}
          </Pressable>
        </View>
      ),
    });
  }, [navigation, user]);

  const onOpenProfile = () => {
    console.log(`onOpenProfile`);
    navigation.navigate('Profile');
  };

  const onStartSim = () => {
    navigation.navigate('SimRequest');
    // old one
    // console.log("onStartSim")
    // autoSimulation(cid);
  };

  const startSimulationBtn = () => {
    return !user || !user.type || user.type == "Client" ? (
          <View style={styles.button}>
            <CustomButton
              title="Start New Simulation"
              onPress={onStartSim}
              hasMarginBottom={true}
            />
          </View> )
          : null
  }

  return (
    <SafeAreaView style={styles.fullscreen}>
      <View style={styles.block}>
        <Image
          source={require('../assets/images/HousePhoto.png')}
          style={styles.image}
          //resizeMode="center"
        />
      </View>
      {startSimulationBtn()}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: 380, height: 480, borderRadius: 15},
  button: {width: '100%', paddingHorizontal: 16},
  profile: {
    marginVertical: 10,
  },
});

export default HomeScreen;
