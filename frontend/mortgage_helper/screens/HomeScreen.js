import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import CustomButton from '../components/CustomButton';
import Avatar from '../components/Avatar';
import {useUserContext} from '../contexts/UserContext';

function HomeScreen({navigation, onSubmit}) {
  const {user} = useUserContext();
  const firstName = user === null ? '' : user.firstName;
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
            <Avatar style={styles.profile} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, firstName]);

  const onOpenProfile = () => {
    console.log(`onOpenProfile`);
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.fullscreen}>
      <View style={styles.block}>
        <Image
          source={require('../assets/images/HousePhoto.png')}
          style={styles.image}
          resizeMode="center"
        />
      </View>
      <View style={styles.button}>
        <CustomButton
          title="Start New Simulation"
          onPress={onSubmit}
          hasMarginBottom={true}
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
  block: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  image: {},
  button: {width: '100%', paddingHorizontal: 16},
  profile: {},
});

export default HomeScreen;
