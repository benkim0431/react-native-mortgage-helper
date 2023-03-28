import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function AssetInfoSec({Label, TextBox}) {
  return (
    <View style={styles.block}>
      <TextBox>
        <Label>Type: </Label>Investment
      </TextBox>
      <TextBox>
        <Label>Description: </Label>HISA
      </TextBox>
      <TextBox>
        <Label>value: </Label>$150000.00
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

export default AssetInfoSec;
