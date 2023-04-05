import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Image, StyleSheet, Text, Pressable, TouchableOpacity, ImageBackground} from 'react-native';
import CustomButton from '../components/CustomButton';
import Avatar from '../components/Avatar';
import {useUserContext} from '../contexts/UserContext';
import { getNotificationByCid } from '../api/application';

function HomeScreen({navigation}) {
  const {user} = useUserContext();
  const hasData = user !== null;
  const firstName = hasData ? user.firstName : '';
  const [ notification, setNotification ] = useState({});

  const fetchNotification = async () => {
    if (!hasData) {
      return;
    }
    const result = await getNotificationByCid(user._id);
    console.log('fetchNot', result)
    setNotification(result.fakeNotification);
  };

  useEffect(() => {
    fetchNotification();
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
    return !user || !user.type || user.type == 'Client' ? (
      <View style={styles.button}>
        <CustomButton
          title="Start New Simulation"
          onPress={onStartSim}
          hasMarginBottom={true}
        />
      </View>
    ) : (
      <View style={styles.buttonPlaceholder} />
    );
  };

  const hanlePressNotification = () => {
    navigation.push('Application', {id: notification.applicationId})
  };

  return (
    <SafeAreaView style={styles.fullscreen}>
      <View style={styles.block}>
        {notification.applicationId ? 
          <ImageBackground
            source={require('../assets/images/HousePhoto_WithGradient.png')}
            style={styles.image}
            imageStyle={{ borderRadius: 15}}
          >
            <TouchableOpacity
              activeOpacity={0}
              onPress={hanlePressNotification}
              style={styles.touch}
            >
              <Text style={styles.touchText}>{notification.message}</Text>
            </TouchableOpacity>
          </ImageBackground> :
          <Image
            source={require('../assets/images/HousePhoto.png')}
            style={styles.image}
            //resizeMode="center"
          />
        }
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
  buttonPlaceholder: {
    height: 50,
  },
  touchText: {
    color: 'white',
    marginLeft: 3,
    marginTop: 3
  }
});

export default HomeScreen;
