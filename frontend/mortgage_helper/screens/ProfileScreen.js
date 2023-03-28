import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Pressable,
  Keyboard,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import Avatar from '../components/Avatar';
import {useUserContext} from '../contexts/UserContext';
import {useMutation} from 'react-query';
import {editUserByUuid} from '../api/user';
import {clearToken} from '../api/client';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {createUser} from '../lib/users';
import {changePassword, getCredential, reauthenticate} from '../lib/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ProfileScreen({navigation, route}) {
  const {isResetPW} = route.params ?? {};
  const {user, setUser} = useUserContext();
  const hasData = user !== null;
  //let photoURL = '';
  // console.log('photoURL', photoURL);
  const [form, setForm] = useState({
    uuid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    workNumber: user.workNumber,
    photoURL: user.photoURL,
    curPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    const title = isResetPW ? 'Change Password' : 'Profile';
    photoURL = hasData ? user.photoURL : '';
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: '#14213D',
      },
      headerBackVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <View>
          <Pressable onPress={onUploadPhoto}>
            {hasData ? (
              <Avatar style={styles.profile} source={user.photoURL} />
            ) : (
              <Avatar style={styles.profile} />
            )}
            <Icon
              name="upload-file"
              size={33}
              color="#E6E6E6"
              style={{position: 'absolute', top: 16, left: 14}}
            />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, user]);

  const [loading, setLoading] = useState();
  const {mutate: editProfile} = useMutation(editUserByUuid, {
    onSuccess: () => {
      console.log('Profile update success.');

      //setUser({...form, photoURL});
      // console.log('next:', {...form, photoURL});
      navigation.goBack();
    },
  });

  const onUploadPhoto = () => {
    console.log(`onUploadPhoto`);
    const uuid = user.uuid;
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxWidth: 512,
        includeBase64: Platform.OS === 'android',
      },
      async res => {
        if (res.didCancel) {
          return;
        }
        const asset = res.assets[0];
        const extension = asset.fileName.split('.').pop();
        const reference = storage().ref(`/profile/${uuid}.${extension}`);
        // console.log(asset.base64);

        if (Platform.OS === 'android') {
          await reference.putString(asset.base64, 'base64', {
            contentType: asset.type,
          });
        } else {
          await reference.putFile(asset.uri);
        }

        form.photoURL = res ? await reference.getDownloadURL() : null;
        // console.log('photo:', form.photoURL);
        const fbUser = {uuid: uuid, photoURL: form.photoURL};
        createUser(fbUser);
        // setUser({...user, photoURL: form.photoURL});
        // console.log('Photo2:', {...user});
        navigation.setOptions({
          headerRight: () => (
            <View>
              <Pressable onPress={onUploadPhoto}>
                {form.photoURL ? (
                  <Avatar style={styles.profile} source={form.photoURL} />
                ) : (
                  <Avatar style={styles.profile} />
                )}
                <Icon
                  name="upload-file"
                  size={33}
                  color="#E6E6E6"
                  style={{position: 'absolute', top: 16, left: 14}}
                />
              </Pressable>
            </View>
          ),
        });
      },
    );
  };

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = async () => {
    //console.log('id:', user);
    Keyboard.dismiss();
    const {firstName, lastName, curPassword, newPassword, confirmNewPassword} =
      form;

    if (isResetPW) {
      if (curPassword === '') {
        Alert.alert('Fail', 'Input your Current Password');
      }

      if (newPassword === '') {
        Alert.alert('Fail', 'Input your New Password.');
      }

      if (confirmNewPassword === '') {
        Alert.alert('Fail', 'Input your Confirm New Password');
      }
    } else {
      if (firstName === '') {
        Alert.alert('Fail', 'Input your First Name.');
        return;
      }
      if (lastName === '') {
        Alert.alert('Fail', 'Input your Last Name.');
        return;
      }
    }

    const _id = user._id;
    setLoading(true);
    setForm({});
    try {
      if (isResetPW) {
        const credential = getCredential({curPassword});
        // console.log('cred:', credential);
        const userCredential = await reauthenticate({credential});
        // console.log('cred2:', userCredential);
        await changePassword({newPassword});
        Alert.alert('Success', 'Change Password Success');
        navigation.goBack();
      } else {
        editProfile(form);
        setUser({...form, _id});
      }
    } catch (e) {
      const messages = {
        'auth/wrong-password': 'Wrong Current Password.',
      };
      const msg =
        messages[e.code] ||
        `${isResetPW ? 'Reset Password' : 'Profile Update'} fail`;
      Alert.alert('Fail', msg);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  const onLogout = () => {
    setUser(null);
    clearToken();
    navigation.navigate('SignIn');
  };

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#6200EE" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={styles.keyboradAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <View style={styles.form}>
          {isResetPW ? (
            <>
              <BorderedInput
                hasMarginBottom={true}
                placeholder="Current Password"
                value={form.curPassword}
                onChangeText={createChangeTextHandler('curPassword')}
                secureTextEntry
              />
              <BorderedInput
                hasMarginBottom={true}
                placeholder="New Password"
                value={form.newPassword}
                onChangeText={createChangeTextHandler('newPassword')}
                secureTextEntry
              />
              <BorderedInput
                hasMarginBottom={true}
                placeholder="Confirm New Password"
                value={form.confirmNewPassword}
                onChangeText={createChangeTextHandler('confirmNewPassword')}
                secureTextEntry
              />
            </>
          ) : (
            <>
              <BorderedInput
                hasMarginBottom={true}
                placeholder="First Name"
                value={form.firstName}
                onChangeText={createChangeTextHandler('firstName')}
              />
              <BorderedInput
                hasMarginBottom={true}
                placeholder="Last Name"
                value={form.lastName}
                onChangeText={createChangeTextHandler('lastName')}
              />
              <BorderedInput
                hasMarginBottom={true}
                placeholder="Phone Number"
                value={form.phoneNumber}
                onChangeText={createChangeTextHandler('phoneNumber')}
              />
              <BorderedInput
                hasMarginBottom={true}
                placeholder="Work Number"
                value={form.workNumber}
                onChangeText={createChangeTextHandler('workNumber')}
              />
            </>
          )}
          {!isResetPW && (
            <View style={styles.buttons}>
              <CustomButton
                title="Reset Password"
                hasMarginBottom={true}
                theme="secondary"
                onPress={() => {
                  navigation.push('Profile', {isResetPW: true});
                }}
              />
              <CustomButton
                title="Sign Out"
                hasMarginBottom={true}
                onPress={onLogout}
              />
            </View>
          )}
        </View>
        <View style={styles.rowButtons}>
          <View style={styles.rowButton}>
            <CustomButton title="Cancel" theme="secondary" onPress={onCancel} />
          </View>
          <View style={styles.rowButton}>
            <CustomButton title="Save" onPress={onSubmit} />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboradAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    // alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#14213D',
  },
  form: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  block: {},
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  rowButton: {
    width: 150,
  },
  buttons: {
    paddingHorizontal: 30,
  },
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14213D',
  },
  profile: {
    marginVertical: 10,
  },
});

export default ProfileScreen;
