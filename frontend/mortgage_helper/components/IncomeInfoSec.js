import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function IncomeInfoSec({Label, TextBox, info}) {
  console.log('info:', info);
  const addr = info[0].businessAddress;
  const street = `${addr.streetNumber} ${addr.streetName}`;
  const fullAddr = addr.unit ? street + `, Unit ${addr.unit}` : street;
  return (
    <View style={styles.block}>
      <TextBox>
        <Label>Type: </Label>
        {info[0].type}
      </TextBox>
      <TextBox>
        <Label>Description: </Label>
        {info[0].description}
      </TextBox>
      <TextBox>
        <Label>Business Name: </Label>
        {info[0].businessName}
      </TextBox>
      <Label>Address: </Label>
      <TextBox>{fullAddr}</TextBox>
      <TextBox>
        <Label>Employment Type: </Label>
        {info[0].paymentType}
      </TextBox>
      <TextBox>
        <Label>Amount: </Label>${info[0].amount}/year
      </TextBox>
      <TextBox>
        <Label>Start Date: </Label>
        {info[0].startDate}
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

export default IncomeInfoSec;
