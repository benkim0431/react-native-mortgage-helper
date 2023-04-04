import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function BasicInfoSec({Label, TextBox, info}) {
  // console.log('info:', info);
  const addr = info.currentAddress;
  const street = `${addr.streetNumber} ${addr.streetName}`;
  const fullAddr = addr.unit ? street + `, Unit ${addr.unit}` : street;
  return (
    <View style={styles.block}>
      <TextBox>
        <Label>First-time Buyer: </Label>
        {info.firstTimeBuyer}
      </TextBox>
      <TextBox>
        <Label>Marital Status: </Label>
        {info.maritalStatus}
      </TextBox>
      <TextBox>
        <Label>Number of Dependents: </Label>
        {info.numberOfDependents}
      </TextBox>
      <Label>Current Address: </Label>
      <TextBox>{fullAddr}</TextBox>
      <TextBox>
        <Label>Current Rent: </Label>$1820.00
      </TextBox>
      <TextBox>
        <Label>Move-in date: </Label>15/12/2021
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

export default BasicInfoSec;
