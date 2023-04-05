import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function AssetInfoSec({Label, TextBox, info}) {
  // console.log('info:', info);
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
        <Label>value: </Label>${info[0].value}
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
