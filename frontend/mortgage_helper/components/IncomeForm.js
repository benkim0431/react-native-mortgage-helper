import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddressForm from './AddressForm';
import BorderedDropdown from './BorderedDropdown';
import BorderedInput from './BorderedInput';

function IncomeForm({incomeInfo, createChangeTextHandler, onValueChange}) {
  return (
    <>
      <Text style={styles.question}>What is the type of your income?</Text>
      <BorderedDropdown
        selectedValue={incomeInfo.incomeType}
        onValueChange={(itemValue, itemIndex) =>
          onValueChange({name: 'incomeType', itemValue})
        }>
        <Picker.Item label="Employed" value="employed" />
        <Picker.Item label="Self-Employed" value="selfEmployed" />
        <Picker.Item label="Other" value="other" />
      </BorderedDropdown>
      <Text style={styles.question}>Any additonal information about it?</Text>
      <BorderedInput
        hasMarginBottom
        value={incomeInfo.incomeDesc}
        onChangeText={createChangeTextHandler('incomeDesc')}
      />
      <Text style={styles.question}>Business Name</Text>
      <BorderedInput
        hasMarginBottom
        value={incomeInfo.businessName}
        onChangeText={createChangeTextHandler('businessName')}
      />
      <Text style={styles.question}>Business Type</Text>
      <BorderedInput
        hasMarginBottom
        value={incomeInfo.businessType}
        onChangeText={createChangeTextHandler('businessType')}
      />
      <Text style={styles.question}>What is your job title?</Text>
      <BorderedInput
        hasMarginBottom
        value={incomeInfo.jobTitle}
        onChangeText={createChangeTextHandler('jobTitle')}
      />
      <Text style={styles.question}>And your employment type?</Text>
      <BorderedInput
        hasMarginBottom
        value={incomeInfo.employmentType}
        onChangeText={createChangeTextHandler('employmentType')}
      />
      <View style={styles.rowLabels}>
        <Text style={styles.question}>Amount earned yearly:</Text>
        <Text style={styles.question}>Start Date</Text>
      </View>
      <View style={styles.rowInputs}>
        <View style={styles.rowInput}>
          <BorderedInput
            hasMarginBottom
            value={incomeInfo.salary}
            onChangeText={createChangeTextHandler('salary')}
          />
        </View>
        <View style={styles.rowInput}>
          <BorderedInput
            hasMarginBottom
            value={incomeInfo.workStartDate}
            onChangeText={createChangeTextHandler('workStartDate')}
          />
        </View>
      </View>
      <Text style={styles.question}>Company Address:</Text>
      <AddressForm
        info={incomeInfo}
        createChangeTextHandler={createChangeTextHandler}
        onValueChange={onValueChange}
      />
    </>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  rowLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    width: 180,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default IncomeForm;
