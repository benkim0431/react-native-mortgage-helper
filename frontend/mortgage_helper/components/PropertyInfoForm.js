import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import BorderedDropdown from './BorderedDropdown';
import {Picker} from '@react-native-picker/picker';
import AddressForm from './AddressForm';
import {useDispatch, useSelector} from 'react-redux';
import {
  propertyTypeSetValue,
  propertyAddrStNumSetValue,
  propertyAddrStNameSetValue,
  propertyAddrUnitSetValue,
  propertyAddrCitySetValue,
  propertyAddrProvSetValue,
  propertyAddrCountrySetValue,
  propertyAddrPostSetValue,
} from '../modules/propertyInfo';

function PropertyInfoForm() {
  const dispatch = useDispatch();
  const propertyInfo = useSelector(state => state.propertyInfo);
  // console.log('prop:', propertyInfo);

  const onValueChange = ({name, itemValue}) => {
    switch (name) {
      case 'propertyType':
        dispatch(propertyTypeSetValue(itemValue));
        break;
      case 'province':
        dispatch(propertyAddrProvSetValue(itemValue));
        break;
      default:
        break;
    }
  };

  const createChangeTextHandler = name => value => {
    switch (name) {
      case 'streetNumber':
        dispatch(propertyAddrStNumSetValue(value));
        break;
      case 'streetName':
        dispatch(propertyAddrStNameSetValue(value));
        break;
      case 'unit':
        dispatch(propertyAddrUnitSetValue(value));
        break;
      case 'city':
        dispatch(propertyAddrCitySetValue(value));
        break;

      case 'country':
        dispatch(propertyAddrCountrySetValue(value));
        break;
      case 'postalCode':
        dispatch(propertyAddrPostSetValue(value));
        break;
      default:
        break;
    }
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tell us more about the property:</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.question}>Intended Use of Property</Text>
        <BorderedDropdown
          selectedValue={propertyInfo.propertyType}
          onValueChange={(itemValue, itemIndex) =>
            onValueChange({name: 'propertyType', itemValue})
          }>
          <Picker.Item label="Own Living" value="own" />
          <Picker.Item label="Renting" value="rent" />
        </BorderedDropdown>
        <Text style={styles.question}>Address</Text>
        <AddressForm
          info={propertyInfo}
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
  question: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default PropertyInfoForm;
