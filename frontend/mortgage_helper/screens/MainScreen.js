import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet} from 'react-native';

function MainScreen() {
  return (
    <SafeAreaView style={styles.fullscreen}>
      <Text style={styles.text}>HOWNAPP</Text>
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
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MainScreen;
