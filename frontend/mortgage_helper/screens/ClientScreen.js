import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet} from 'react-native';

function ClientScreen(navigation, route) {
  const {isClient} = route.params ?? {};
  const {isBroker} = route.params ?? {};
  const onSubmit = async () => {
    setLoading(true);
    if (isClient) {
      navigation.navigate('ClientScreen');
    } else {
      navigation.navigate('BrokerScreen');
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.fullscreen}>
      <Text style={styles.text}>Client View</Text>
      <ClientButtons
            isClient={isClient}
            onSubmit={onSubmit}
            loading={loading}
        />
        <BrokerButtons
            isBroker={isBroker}
            onSubmit={onSubmit}
            loading={loading}
        />
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

export default ClientScreen;
