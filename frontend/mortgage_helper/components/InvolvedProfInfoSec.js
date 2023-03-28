import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function InvolvedProfInfoSec({Label, TextBox}) {
  return (
    <View style={styles.block}>
      <TextBox>
        <Label>Type: </Label>Lawyer
      </TextBox>
      <TextBox>
        <Label>Full Name: </Label>Taylor Spencer
      </TextBox>
      <TextBox>
        <Label>Email: </Label>tylor.spencer@lawyaer.ca
      </TextBox>
      <TextBox>
        <Label>Work Number: </Label>519-554-2356
      </TextBox>
      <TextBox>
        <Label>Cost: </Label>$18000.00
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

export default InvolvedProfInfoSec;
