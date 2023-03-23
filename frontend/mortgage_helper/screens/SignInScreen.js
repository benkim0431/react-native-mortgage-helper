import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQuery} from 'react-query';
import {getDeviceId} from 'react-native-device-info';
import {registerUser, loginUser} from '../api/user';

import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import {signIn, signUp} from '../lib/auth';
import {applyToken} from '../api/client';
import {createUser} from '../lib/users';
import auth from '@react-native-firebase/auth'
import { GoogleSignin,  GoogleSigninButton } from '@react-native-google-signin/google-signin';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params ?? {};
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    workNumber: '',
    photoURL: '',
  });

  const [loading, setLoading] = useState();
  const {mutate: register} = useMutation(registerUser, {
    onSuccess: data => {
      createUser({
        uuid: data.uuid,
        photoURL: null,
      });
      navigation.navigate('SignIn');
    },
  });

  const {mutate: login, isLoading: loginLoading} = useMutation(loginUser, {
    onSuccess: data => {
      console.log('login success');
      applyToken(data.token);
    },
  });

  // This can be found in the android/app/google-services.json file as 
  // the client/oauth_client/client_id property .Make sure to pick the client_id with client_type: 3
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId: '280930449998-sd9ja6t7cve3i9k1sk6tgos38q91tg0s.apps.googleusercontent.com',

    })
  }
  const checkLoggedIn = () => {
    auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("loggedIn : user" + user.value);
        } else {
            console.log("loggedOut")
        }
    }
    )
}
  useEffect(() => {
    googleSigninConfigure();
    checkLoggedIn();
  });

  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
}

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };
  const onSubmit = async () => {
    Keyboard.dismiss();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      workNumber,
      photoURL,
    } = form;

    if (email === '') {
      Alert.alert('Fail', 'Input your Email.');
      return;
    }
    if (password === '') {
      Alert.alert('Fail', 'Input your Password.');
      return;
    }

    if (isSignUp) {
      if (firstName === '') {
        Alert.alert('Fail', 'Input your First Name.');
        return;
      }
      if (lastName === '') {
        Alert.alert('Fail', 'Input your Last Name.');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Fail', 'Check your Confirm Password.');
        return;
      }
    }

    const info = {email, password};
    setLoading(true);
    setForm({});
    try {
      const {user} = isSignUp ? await signUp(info) : await signIn(info);
      // console.log(user);
      const uuid = user.uid.trim();

      if (isSignUp) {
        register({
          uuid,
          firstName,
          lastName,
          phoneNumber,
          workNumber,
          photoURL,
        });
      } else {
        const deviceId = getDeviceId();
        login({uuid, deviceId});
        if (!loginLoading) {
          //const {photoURL} = await getUser(uuid);
          // console.log('PhotoURL', photoURL);
          navigation.navigate('MainTab', {uuid: uuid});
        }
      }
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': 'This email is already in use.',
        'auth/wrong-password': 'Wrong Password.',
        'auth/user-not-found': 'Cannot find user.',
        'auth/invalid-email': 'Invalid Email address',
      };
      const msg = messages[e.code] || `${isSignUp ? 'Register' : 'Login'} fail`;
      Alert.alert('Fail', msg);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        {/* <Text style={styles.text}>HOWNAPP</Text> */}
        <View>
          <Image
            source={require('../assets/images/hownLogo.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
        <View style={styles.sso}>
          <GoogleSigninButton
            name={'Google Sign-In'}
            onSubmit={onGoogleButtonPress}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#14213D',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 200,
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
  },
  sso: {
    paddingTop: 16,
  },
});

export default SignInScreen;
