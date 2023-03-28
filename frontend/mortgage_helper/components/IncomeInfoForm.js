import React from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  incomeTypeSetValue,
  incomeDescSetValue,
  businessNameSetValue,
  businessTypeSetValue,
  jobTitleSetValue,
  empTypeSetValue,
  incomeAddrCitySetValue,
  incomeAddrCountrySetValue,
  incomeAddrPostSetValue,
  incomeAddrStNameSetValue,
  incomeAddrStNumSetValue,
  incomeAddrUnitSetValue,
  incomeAddrProvSetValue,
  salarySetValue,
  workStartDateSetValue,
} from '../modules/incomeInfo';
import IncomeForm from './IncomeForm';

function IncomeInfoForm() {
  const dispatch = useDispatch();
  const incomeInfo = useSelector(state => state.incomeInfo);
  // console.log('income:', incomeInfo);

  const onValueChange = ({name, itemValue}) => {
    switch (name) {
      case 'incomeType':
        dispatch(incomeTypeSetValue(itemValue));
        break;
      case 'province':
        dispatch(incomeAddrProvSetValue(itemValue));
        break;
      default:
        break;
    }
  };

  const createChangeTextHandler = name => value => {
    switch (name) {
      case 'incomeDesc':
        dispatch(incomeDescSetValue(value));
        break;
      case 'businessName':
        dispatch(businessNameSetValue(value));
        break;
      case 'businessType':
        dispatch(businessTypeSetValue(value));
        break;
      case 'jobTite':
        dispatch(jobTitleSetValue(value));
        break;
      case 'employmentType':
        dispatch(empTypeSetValue(value));
        break;
      case 'salary':
        dispatch(salarySetValue(value));
        break;
      case 'workStartDate':
        dispatch(workStartDateSetValue(value));
        break;
      case 'streetNumber':
        dispatch(incomeAddrStNumSetValue(value));
        break;
      case 'streetName':
        dispatch(incomeAddrStNameSetValue(value));
        break;
      case 'unit':
        dispatch(incomeAddrUnitSetValue(value));
        break;
      case 'city':
        dispatch(incomeAddrCitySetValue(value));
        break;
      case 'country':
        dispatch(incomeAddrCountrySetValue(value));
        break;
      case 'postalCode':
        dispatch(incomeAddrPostSetValue(value));
        break;
      default:
        break;
    }
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tell us more about your incomes:</Text>
      </View>
      <View style={styles.form}>
        <IncomeForm
          incomeInfo={incomeInfo}
          createChangeTextHandler={createChangeTextHandler}
          onValueChange={onValueChange}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default IncomeInfoForm;
