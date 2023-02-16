import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Pressable,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BorderedInput from '../components/BorderedInput';
import CustomButton from '../components/CustomButton';
import Avatar from '../components/Avatar';
import {useUserContext} from '../contexts/UserContext';
import {useMutation} from 'react-query';
import {editUserByUuid} from '../api/user';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {createUser} from '../lib/users';

function ProfileScreen({navigation}) {
  const {user} = useUserContext();
  console.log(user);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Pressable onPress={onUploadPhoto}>
            <Avatar
              style={styles.profile}
              // source={{uri: response?.assets[0]?.uri}}
            />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);

  const [form, setForm] = useState({
    uid: user.uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    workNumber: user.workNumber,
  });

  const [loading, setLoading] = useState();
  const {mutate: editProfile} = useMutation(editUserByUuid, {
    onSuccess: () => {
      console.log('Profile update success.');
      navigation.goBack();
    },
  });

  const onUploadPhoto = () => {
    console.log(`onUploadPhoto`);

    let photoURL = null;
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
        console.log(asset.base64);

        if (Platform.OS === 'android') {
          await reference.putString(asset.base64, 'base64', {
            contentType: asset.type,
          });
        } else {
          await reference.putFile(asset.uri);
        }

        photoURL = res ? await reference.getDownloadURL() : null;
        const user = {uuid: uuid, photoURL};
        createUser(user);
      },
    );
  };

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    console.log(form);
    Keyboard.dismiss();
    const {firstName, lastName} = form;

    if (firstName === '') {
      Alert.alert('Fail', 'Input your First Name.');
      return;
    }
    if (lastName === '') {
      Alert.alert('Fail', 'Input your Last Name.');
      return;
    }

    setLoading(true);
    try {
      editProfile(form);
    } catch (e) {
      Alert.alert('Fail', 'Profile update fail');
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <View style={styles.form}>
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

          <View style={styles.rowButtons}>
            <View style={styles.rowButton}>
              <CustomButton
                title="Cancel"
                theme="secondary"
                onPress={onCancel}
              />
            </View>
            <View style={styles.rowButton}>
              <CustomButton title="Save" onPress={onSubmit} />
            </View>
          </View>
        </View>
        <View style={styles.buttons}>
          <CustomButton
            title="Reset Password"
            hasMarginBottom={true}
            theme="secondary"
          />
          <CustomButton title="Sign Out" hasMarginBottom={true} />
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
  form: {
    width: '100%',
    paddingHorizontal: 16,
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
    width: 300,
  },
});

export default ProfileScreen;
