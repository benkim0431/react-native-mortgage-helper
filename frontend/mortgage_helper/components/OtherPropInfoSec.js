import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function OtherPropInfoSec({Label, TextBox, info}) {
  // console.log('info:', info);
  const addr = info[0].address;
  const street = `${addr.streetNumber} ${addr.streetName}`;
  const fullAddr = addr.unit ? street + `, Unit ${addr.unit}` : street;

  return (
    <View style={styles.block}>
      <Label>Address: </Label>
      <TextBox>{fullAddr}</TextBox>
      <TextBox>
        <Label>Annual Taxes: </Label>${info[0].annualPropertyTaxes}
      </TextBox>
      <TextBox>
        <Label>Property Fees: </Label>${info[0].value}
      </TextBox>
      <TextBox>
        <Label>Monthly Payment: </Label>${info[0].monthlyPayment}
      </TextBox>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default OtherPropInfoSec;
