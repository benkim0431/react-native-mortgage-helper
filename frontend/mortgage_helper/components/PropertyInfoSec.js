import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function PropertyInfoSec({Label, TextBox, info}) {
  // console.log('info:', info);
  const addr = info[0] == undefined ? "" : info[0].address;
  const street = addr == "" ? "" : `${addr.streetNumber} ${addr.streetName}`;
  const fullAddr = addr == "" ? "" : addr.unit ? street + `, Unit ${addr.unit}` : street;

  return (
    <View style={styles.block}>
      <TextBox>
        <Label>Intended Use of Property: </Label>Own Living
      </TextBox>

      <Label>Address: </Label>
      <TextBox>{fullAddr}</TextBox>
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
