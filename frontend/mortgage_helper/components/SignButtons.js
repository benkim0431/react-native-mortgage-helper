import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import CustomButton from '../components/CustomButton';

function SignButtons({isSignUp, onSubmit, loading}) {
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={32} color="#6200EE" />
      </View>
    );
  }

  return (
    <View style={styles.buttons}>
      {isSignUp ? (
        <>
          <CustomButton title="Register" onPress={onSubmit} />
        </>
      ) : (
        <>
          <CustomButton
            title="Login"
            hasMarginBottom={true}
            onPress={onSubmit}
          />
          <CustomButton
            title="Register"
            theme="secondary"
            onPress={() => {
              navigation.push('SignIn', {isSignUp: true});
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerWrapper: {
    marginTop: 64,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 64,
  },
});

export default SignButtons;
