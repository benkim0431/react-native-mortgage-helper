import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function OtherPropInfoSec({Label, TextBox}) {
  return (
    <View style={styles.block}>
      <Label>Address: </Label>
      <TextBox>202A Ira Needles Blvd, Unit 801</TextBox>
      <TextBox>
        <Label>Annual Taxes: </Label>$350.00
      </TextBox>
      <TextBox>
        <Label>Condo Fees: </Label>$200.00
      </TextBox>
      <TextBox>
        <Label>Monthly Payment: </Label>$1000.00
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
