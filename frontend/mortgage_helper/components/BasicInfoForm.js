import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  maritalSetValue,
  isFirstSetValue,
  dependentsSetValue,
  basicAddrStNumSetValue,
  basicAddrStNameSetValue,
  basicAddrUnitSetValue,
  basicAddrCitySetValue,
  basicAddrProvSetValue,
  basicAddrCountrySetValue,
  basicAddrPostSetValue,
  basicAddrCurRentSetValue,
  basicAddrMIDateSetValue,
} from '../modules/basicInfo';
import {Picker} from '@react-native-picker/picker';
import BorderedDropdown from '../components/BorderedDropdown';
import AddressDetailForm from './AddressDetailForm';

function BasicInfoForm() {
  const dispatch = useDispatch();
  const basicInfo = useSelector(state => state.basicInfo);
  const onValueChange = ({name, itemValue}) => {
    switch (name) {
      case 'province':
        dispatch(basicAddrProvSetValue(itemValue));
        break;
      default:
        break;
    }
  };
  const createChangeTextHandler = name => value => {
    switch (name) {
      case 'streetNumber':
        dispatch(basicAddrStNumSetValue(value));
        break;
      case 'streetName':
        dispatch(basicAddrStNameSetValue(value));
        break;
      case 'unit':
        dispatch(basicAddrUnitSetValue(value));
        break;
      case 'city':
        dispatch(basicAddrCitySetValue(value));
        break;
      case 'province':
        dispatch(basicAddrProvSetValue(value));
        break;
      case 'country':
        dispatch(basicAddrCountrySetValue(value));
        break;
      case 'postalCode':
        dispatch(basicAddrPostSetValue(value));
        break;
      case 'currentRent':
        dispatch(basicAddrCurRentSetValue(value));
        break;
      case 'moveInDate':
        dispatch(basicAddrMIDateSetValue(value));
        break;
      default:
        break;
    }
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tell us more about yourself:</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.question}>Are you a first time home buyer?</Text>
        <BorderedDropdown
          selectedValue={basicInfo.isFirstValue}
          onValueChange={(itemValue, itemIndex) =>
            dispatch(isFirstSetValue(itemValue))
          }>
          <Picker.Item label="Yes" value="yes" />
          <Picker.Item label="No" value="no" />
        </BorderedDropdown>
        <Text style={styles.question}>What is your marital status?</Text>
        <BorderedDropdown
          selectedValue={basicInfo.maritalValue}
          onValueChange={(itemValue, itemIndex) =>
            dispatch(maritalSetValue(itemValue))
          }>
          <Picker.Item label="Single" value="Single" />
          <Picker.Item label="Marrige" value="Marrige" />
          <Picker.Item label="Divorced" value="Divorced" />
        </BorderedDropdown>

        <Text style={styles.question}>How many dependents do you have?</Text>
        <BorderedDropdown
          selectedValue={basicInfo.dependentsValue}
          onValueChange={(itemValue, itemIndex) =>
            dispatch(dependentsSetValue(itemValue))
          }>
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
        </BorderedDropdown>
        <Text style={styles.question}>What is your current address? </Text>
        <AddressDetailForm
          info={basicInfo}
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
  question: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
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

export default BasicInfoForm;
