import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import InvolvedProfForm from './InvolvedProfForm';
import {
  hasProfessSetValue,
  professTypeSetValue,
  professNameSetValue,
  professEmailSetValue,
  professWorkNumSetValue,
  professCostSetValue,
} from '../modules/professInfo';

function InvolvedProfInfoForm() {
  const dispatch = useDispatch();
  const professInfo = useSelector(state => state.professInfo);
  //console.log('professInfo', professInfo);

  const onValueChange = ({name, itemValue}) => {
    switch (name) {
      case 'hasProfessional':
        dispatch(hasProfessSetValue(itemValue));
        break;
      case 'professionalType':
        dispatch(professTypeSetValue(itemValue));
        break;
      default:
        break;
    }
  };

  const createChangeTextHandler = name => value => {
    switch (name) {
      case 'professionalName':
        dispatch(professNameSetValue(value));
        break;
      case 'professionalEmail':
        dispatch(professEmailSetValue(value));
        break;
      case 'professionalWorkNum':
        dispatch(professWorkNumSetValue(value));
        break;
      case 'professionalcost':
        dispatch(professCostSetValue(value));
        break;
      default:
        break;
    }
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text
          style={
            styles.title
          }>{`Great! Help is always welcomed.\nTell us more about them:`}</Text>
      </View>
      <View style={styles.form}>
        <InvolvedProfForm
          profssInfo={professInfo}
          createChangeTextHandler={createChangeTextHandler}
          onValueChange={onValueChange}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
export default InvolvedProfInfoForm;
