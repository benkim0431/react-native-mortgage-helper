import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BorderedInput from './BorderedInput';
import ProvinceDropdown from './ProvinceDropdown';

function BrokerInfoForm({brokerInfo, createChangeTextHandler, onValueChange}) {
  console.log('broker:', brokerInfo);
  return (
    <View>
      <Text style={styles.question}>What is your company name?</Text>
      <BorderedInput
        hasMarginBottom
        value={brokerInfo.brokerCompanyName}
        onChangeText={createChangeTextHandler('brokerCompanyName')}
      />
      <Text style={styles.question}>How many percentage do you want?</Text>
      <BorderedInput
        hasMarginBottom
        value={brokerInfo.brokerPercentageFee}
        onChangeText={createChangeTextHandler('brokerPercentageFee')}
      />
      <Text style={styles.question}>Which province do you work?</Text>
      <ProvinceDropdown
        province={brokerInfo.brokerProvince}
        onValueChange={onValueChange}
      />
    </View>
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

export default BrokerInfoForm;
