import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import BorderedDropdown from './BorderedDropdown';
import BorderedInput from './BorderedInput';

function AssetForm({assetInfo, createChangeTextHandler, onValueChange}) {
  return (
    <ScrollView>
      <Text style={styles.question}>Type of Asset:</Text>
      <BorderedDropdown
        selectedValue={assetInfo.assetType}
        onValueChange={(itemValue, itemIndex) =>
          onValueChange({name: 'assetType', itemValue})
        }>
        <Picker.Item label="Investment" value="investment" />
        <Picker.Item label="Savings" value="savings" />
        <Picker.Item label="Other" value="other" />
      </BorderedDropdown>
      <Text style={styles.question}>Short Description</Text>
      <BorderedInput
        hasMarginBottom
        value={assetInfo.assetDesc}
        onChangeText={createChangeTextHandler('assetDescription')}
      />
      <Text style={styles.question}>Total Value</Text>
      <BorderedInput
        hasMarginBottom
        value={assetInfo.assetTotalValue}
        onChangeText={createChangeTextHandler('assetTotalValue')}
      />
      <Text style={styles.question}>
        Will this asset be used in your down payment?
      </Text>
      <BorderedDropdown
        selectedValue={assetInfo.isAssetForDownPayment}
        onValueChange={(itemValue, itemIndex) =>
          onValueChange({name: 'isAssetForDownPayment', itemValue})
        }>
        <Picker.Item label="Yes" value="yes" />
        <Picker.Item label="No" value="no" />
      </BorderedDropdown>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default AssetForm;
