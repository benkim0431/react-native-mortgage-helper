import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function InvolvedProfInfoSec({Label, TextBox, info}) {
  // console.log('info:', info);
  return (
    <View style={styles.block}>
      <TextBox>
        <Label>Type: </Label>
        {info[0].type}
      </TextBox>
      <TextBox>
        <Label>Full Name: </Label>
        {info[0].fullName}
      </TextBox>
      <TextBox>
        <Label>Email: </Label>
        {info[0].email}
      </TextBox>
      <TextBox>
        <Label>Work Number: </Label>
        {info[0].workNumber}
      </TextBox>
      <TextBox>
        <Label>Cost: </Label>${info[0].cost}
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
