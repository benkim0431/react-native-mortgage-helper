import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddressForm from './AddressForm';
import BorderedInput from './BorderedInput';

function OtherPropForm({
  otherPropInfo,
  createChangeTextHandler,
  onValueChange,
}) {
  return (
    <>
      <Text style={styles.question}>Address</Text>
      <AddressForm
        info={otherPropInfo}
        createChangeTextHandler={createChangeTextHandler}
        onValueChange={onValueChange}
      />
      <View style={styles.rowLabels}>
        <Text style={styles.question}>Annual Taxes:</Text>
        <Text style={styles.question}>Monthly Payment:</Text>
      </View>
      <View style={styles.rowInputs}>
        <View style={styles.rowInput}>
          <BorderedInput
            hasMarginBottom
            value={otherPropInfo.annualTax}
            onChangeText={createChangeTextHandler('annualTax')}
          />
        </View>
        <View style={styles.rowInput}>
          <BorderedInput
            hasMarginBottom
            value={otherPropInfo.monthlyPay}
            onChangeText={createChangeTextHandler('monthlyPay')}
          />
        </View>
      </View>
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
  rowLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    width: 180,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default OtherPropForm;
