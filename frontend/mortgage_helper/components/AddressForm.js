import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import BorderedInput from '../components/BorderedInput';
import BorderedDropdown from '../components/BorderedDropdown';

function AddressForm({info, createChangeTextHandler, onValueChange}) {
  // console.log('basicInfo:', basicInfo);
  return (
    <View>
      <View style={styles.rowInputs}>
        <View style={styles.rowInput}>
          <BorderedInput
            hasMarginBottom
            placeholder="Street Number"
            value={info.address.streetNumber}
            onChangeText={createChangeTextHandler('streetNumber')}
          />
        </View>
        <View style={styles.rowInput}>
          <BorderedInput
            placeholder="Unit"
            value={info.address.unit}
            onChangeText={createChangeTextHandler('unit')}
          />
        </View>
      </View>
      <BorderedInput
        hasMarginBottom
        placeholder="Street Name"
        value={info.address.streetName}
        onChangeText={createChangeTextHandler('streetName')}
      />
      <View style={styles.rowInputs}>
        <View style={styles.rowInput}>
          <BorderedInput
            hasMarginBottom
            placeholder="City"
            value={info.address.city}
            onChangeText={createChangeTextHandler('city')}
          />
        </View>
        <View style={styles.rowInput}>
          <BorderedDropdown
            selectedValue={info.address.province}
            onValueChange={(itemValue, itemIndex) =>
              onValueChange({name: 'province', itemValue})
            }>
            <Picker.Item label="Arberta" value="ab" />
            <Picker.Item label="Ontario" value="on" />
          </BorderedDropdown>
        </View>
      </View>
      <View style={styles.rowInputs}>
        <View style={styles.rowInput}>
          <BorderedInput
            hasMarginBottom
            placeholder="Country"
            value={info.address.country}
            onChangeText={createChangeTextHandler('country')}
          />
        </View>
        <View style={styles.rowInput}>
          <BorderedInput
            placeholder="Postal Code"
            value={info.address.postalCode}
            onChangeText={createChangeTextHandler('postalCode')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowInput: {
    width: 180,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default AddressForm;
