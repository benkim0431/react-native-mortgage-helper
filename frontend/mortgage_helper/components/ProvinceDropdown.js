import React from 'react';
import {StyleSheet} from 'react-native';
import BorderedDropdown from './BorderedDropdown';
import {Picker} from '@react-native-picker/picker';

function ProvinceDropdown({province, onValueChange}) {
  return (
    <BorderedDropdown
      selectedValue={province}
      onValueChange={(itemValue, itemIndex) =>
        onValueChange({name: 'province', itemValue})
      }>
      <Picker.Item label="Arberta" value="AB" />
      <Picker.Item label="British Columbia" value="BC" />
      <Picker.Item label="Manitoba" value="MB" />
      <Picker.Item label="New Brunswick" value="NB" />
      <Picker.Item label="Newfoundland and Labrador" value="NL" />
      <Picker.Item label="Northwest Territories" value="NT" />
      <Picker.Item label="Nova Scotia" value="NS" />
      <Picker.Item label="Nunavut" value="NU" />
      <Picker.Item label="Ontario" value="ON" />
      <Picker.Item label="Prince Edward Island" value="PE" />
      <Picker.Item label="Quebec" value="QC" />
      <Picker.Item label="Ontario" value="ON" />
      <Picker.Item label="Saskatchewan" value="SK" />
      <Picker.Item label="Yukon" value="YT" />
    </BorderedDropdown>
  );
}

const styles = StyleSheet.create({});

export default ProvinceDropdown;
