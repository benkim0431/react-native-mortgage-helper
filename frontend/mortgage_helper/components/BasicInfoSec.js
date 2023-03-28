import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function BasicInfoSec({Label, TextBox}) {
  return (
    <View style={styles.block}>
      <TextBox>
        <Label>First-time Buyer: </Label>Yes
      </TextBox>
      <TextBox>
        <Label>Marital Status: </Label>Married
      </TextBox>
      <TextBox>
        <Label>Number of Dependents: </Label>0
      </TextBox>
      <Label>Current Address: </Label>
      <TextBox>202A Ira Needles Blvd, Unit 801</TextBox>
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
