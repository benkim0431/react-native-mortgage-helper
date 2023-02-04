import React, {useState} from 'react';
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
import {useMutation} from 'react-query';
import {registerUser} from '../api/user';
import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import {signIn, signUp} from '../lib/auth';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params ?? {};
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState();
  const {mutate: register} = useMutation(registerUser, {
    onSuccess: () => {
      isSignUp ? navigation.navigate('SignIn') : navigation.navigate('Main');
    },
  });

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };
  const onSubmit = async () => {
    Keyboard.dismiss();
    const {firstName, lastName, email, password, confirmPassword} = form;

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
      console.log(user);
      const uid = user.uid;
      register({uid, firstName, lastName});
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
});

export default SignInScreen;
