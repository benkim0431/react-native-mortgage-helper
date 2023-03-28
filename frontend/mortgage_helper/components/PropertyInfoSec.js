import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function PropertyInfoSec({Label, TextBox}) {
  return (
    <View style={styles.block}>
      <TextBox>
        <Label>Intended Use of Property: </Label>Own Living
      </TextBox>

      <Label>Address: </Label>
      <TextBox>202A Ira Needles Blvd, Unit 801</TextBox>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default PropertyInfoSec;
