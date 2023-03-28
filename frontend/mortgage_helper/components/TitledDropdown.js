import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BorderedDropdown from './BorderedDropdown';

function TitledDropdown({title, isLong, selectedValue, onValueChange}) {
  return (
    <>
      <View style={[styles.header, isLong && styles.twoLine]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.form}>
        <BorderedDropdown
          selectedValue={selectedValue}
          onValueChange={onValueChange}>
          <Picker.Item label="Yes" value={true} />
          <Picker.Item label="No" value={false} />
        </BorderedDropdown>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
  },
  twoLine: {
    height: 80,
  },
});

export default TitledDropdown;
