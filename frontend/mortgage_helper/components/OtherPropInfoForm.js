import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import OtherPropForm from './OtherPropForm';
import {
  otherPropertyAddrStNumSetValue,
  otherPropertyAddrStNameSetValue,
  otherPropertyAddrUnitSetValue,
  otherPropertyAddrCitySetValue,
  otherPropertyAddrCountrySetValue,
  otherPropertyAddrPostSetValue,
  otherPropertyAnnualTaxSetValue,
  otherPropertyMonthlyPaySetValue,
  otherPropertyAddrProvSetValue,
} from '../modules/otherPropInfo';

function OtherPropInfoForm() {
  const dispatch = useDispatch();
  const otherPropInfo = useSelector(state => state.otherPropInfo);
  console.log('Other:', otherPropInfo);

  const onValueChange = ({name, itemValue}) => {
    switch (name) {
      case 'province':
        dispatch(otherPropertyAddrProvSetValue(itemValue));
        break;
      default:
        break;
    }
  };

  const createChangeTextHandler = name => value => {
    switch (name) {
      case 'streetNumber':
        dispatch(otherPropertyAddrStNumSetValue(value));
        break;
      case 'streetName':
        dispatch(otherPropertyAddrStNameSetValue(value));
        break;
      case 'unit':
        dispatch(otherPropertyAddrUnitSetValue(value));
        break;
      case 'city':
        dispatch(otherPropertyAddrCitySetValue(value));
        break;
      case 'country':
        dispatch(otherPropertyAddrCountrySetValue(value));
        break;
      case 'postalCode':
        dispatch(otherPropertyAddrPostSetValue(value));
        break;
      case 'annualTax':
        dispatch(otherPropertyAnnualTaxSetValue(value));
        break;
      case 'monthlyPay':
        dispatch(otherPropertyMonthlyPaySetValue(value));
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Awesome! Tell us more about them?</Text>
      </View>
      <View style={styles.form}>
        <OtherPropForm
          otherPropInfo={otherPropInfo}
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

export default OtherPropInfoForm;
