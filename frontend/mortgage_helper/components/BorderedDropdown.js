import React from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';

function BorderedDropdown({children, ...rest}) {
  return (
    <View style={[styles.dropdown]}>
      <Picker {...rest}>{children}</Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    height: 48,
    marginBottom: 16,
  },
});

export default BorderedDropdown;
