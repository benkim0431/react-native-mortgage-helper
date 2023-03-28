import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function IncomeInfoSec({Label, TextBox}) {
  return (
    <View style={styles.block}>
      <TextBox>
        <Label>Type: </Label>Employed
      </TextBox>
      <TextBox>
        <Label>Description: </Label>Some description
      </TextBox>
      <TextBox>
        <Label>Business Name: </Label>Sera4
      </TextBox>
      <Label>Address: </Label>
      <TextBox>202A Ira Needles Blvd, Unit 801</TextBox>
      <TextBox>
        <Label>Employment Type: </Label>Part-time
      </TextBox>
      <TextBox>
        <Label>Amount: </Label>$1500.00/year
      </TextBox>
      <TextBox>
        <Label>Start Date: </Label>03/01/2022
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
