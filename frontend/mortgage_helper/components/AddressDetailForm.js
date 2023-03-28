import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddressForm from './AddressForm';
import BorderedInput from '../components/BorderedInput';

function AddressDetailForm({info, createChangeTextHandler, onValueChange}) {
  //   console.log('basicInfo:', basicInfo);
  return (
    <View>
      <AddressForm
        info={info}
        createChangeTextHandler={createChangeTextHandler}
        onValueChange={onValueChange}
      />
      <View style={styles.rowInputs}>
        <View style={styles.rowInput}>
          <BorderedInput
            hasMarginBottom
            placeholder="Current Rent"
            value={info.address.currentRent}
            onChangeText={createChangeTextHandler('currentRent')}
          />
        </View>
        <View style={styles.rowInput}>
          <BorderedInput
            placeholder="Move-in Date"
            value={info.address.moveInDate}
            onChangeText={createChangeTextHandler('moveInDate')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowInput: {
    width: 180,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default AddressDetailForm;
