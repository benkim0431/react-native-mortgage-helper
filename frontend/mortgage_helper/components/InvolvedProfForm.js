import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BorderedDropdown from './BorderedDropdown';
import BorderedInput from './BorderedInput';

function InvolvedProfForm({
  profssInfo,
  createChangeTextHandler,
  onValueChange,
}) {
  return (
    <>
      <Text style={styles.question}>What type of professional?</Text>
      <BorderedDropdown
        selectedValue={profssInfo.professionalType}
        onValueChange={(itemValue, itemIndex) =>
          onValueChange({name: 'professionalType', itemValue})
        }>
        <Picker.Item label="Realtor" value="realtor" />
        <Picker.Item label="Lawyer" value="lawyer" />
      </BorderedDropdown>
      <Text style={styles.question}>Full Name:</Text>
      <BorderedInput
        hasMarginBottom
        value={profssInfo.professionalName}
        onChangeText={createChangeTextHandler('professionalName')}
      />
      <Text style={styles.question}>Email:</Text>
      <BorderedInput
        hasMarginBottom
        value={profssInfo.professionalEmail}
        onChangeText={createChangeTextHandler('professionalEmail')}
      />
      <Text style={styles.question}>Work Number:</Text>
      <BorderedInput
        hasMarginBottom
        value={profssInfo.professionalWorkNum}
        onChangeText={createChangeTextHandler('professionalWorkNum')}
      />
      <Text style={styles.question}>Cost:</Text>
      <BorderedInput
        hasMarginBottom
        value={profssInfo.professionalcost}
        onChangeText={createChangeTextHandler('professionalcost')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default InvolvedProfForm;
