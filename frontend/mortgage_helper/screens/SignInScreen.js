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
  const [UUID, setUUID] = useState();

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

  // For google SSO
  const {mutate: loginBySSO} = useMutation(registerUser, {
    onSuccess: (data) => {
      console.log('LKM loginBySSO onSuccess');
      const uuid = data.uuid;
      createUser({
        uuid: uuid,
        photoURL: null,
      });
      login({uuid, deviceId: getDeviceId()});
    },
    onError: (error) => {
      console.log('loginBySSO onError', error.message);
      login({uuid: UUID, deviceId: getDeviceId()});
    },
  });

  // For google SSO
  // This can be found in the android/app/google-services.json file as 
  // the client/oauth_client/client_id property .Make sure to pick the client_id with client_type: 3
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: '280930449998-sd9ja6t7cve3i9k1sk6tgos38q91tg0s.apps.googleusercontent.com',

    })
  };

  // To-do
  // For google SSO
  // const checkLoggedIn = () => {
  //   auth().onAuthStateChanged((user) => {
  //       if (user) {
  //           console.log("google loggedIn : user" + user.email);
  //       } else {
  //           console.log("google not logIn");
  //       }
  //   })
  // };

  useEffect(() => {
    // For google SSO
    googleSigninConfigure();
    // checkLoggedIn();
  });

  // For google SSO
  const onGoogleButtonPress = async () => {
    console.log("onGoogleButtonPress");
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(userInfo.idToken);
      const authResult = await auth().signInWithCredential(credential);
      const uuid = authResult.user.uid;
      const firstName = userInfo.user.givenName ? userInfo.user.givenName : '';
      const lastName = userInfo.user.familyName ? userInfo.user.familyName : '';
      const phoneNumber = userInfo.user.phoneNumber ? userInfo.user.phoneNumber : '';
      const workNumber = userInfo.user.workNumber ? userInfo.user.workNumber : '';
      const photoURL = userInfo.user.photoURL? userInfo.user.photoURL : '';
      // console.log("onGoogleButtonPress emial:" + userInfo.user.email);
      // console.log("onGoogleButtonPress uuid:" + uuid);
      // console.log("onGoogleButtonPress firstName:" + firstName);
      // console.log("onGoogleButtonPress lastName:" + lastName);
      // console.log("onGoogleButtonPress phoneNumber:" + phoneNumber);
      // console.log("onGoogleButtonPress workNumber:" + workNumber);
      // console.log("onGoogleButtonPress photoURL:" + photoURL);
      setUUID(uuid);
      loginBySSO({
        uuid,
        firstName,
        lastName,
        phoneNumber,
        workNumber,
        photoURL,
      });
      navigation.navigate('MainTab', {uuid: uuid});
    } catch(error) {
      setUUID('');
      console.log(error);
    }
  };

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
        {!isSignUp && !loading && (
          <View style={styles.form}>
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.text}>  OR  </Text>
              <View style={styles.line} />
            </View>
            <View style={styles.sso}>
              <GoogleSigninButton style={{width: 400, height: 80}}
                name={'Google Sign-In'}
                onPress={onGoogleButtonPress}
              />
            </View>
          </View>
        )}
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
    borderRadius: 20,
    overflow: 'hidden',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 28,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  text: {
    marginHorizontal: 10,
    color: 'white',
  },
});



export default SignInScreen;
