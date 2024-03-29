import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

function BorderedInput({hasMarginBottom, ...rest}) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 14,
    height: 48,
    backgroundColor: '#FFFFFF',
  },
  margin: {
    marginBottom: 16,
  },
});

export default BorderedInput;
