import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AssetForm from './AssetForm';
import {
  assetTypeSetValue,
  assetDescSetValue,
  assetTotValSetValue,
  isAssetForDownPayment,
} from '../modules/assetInfo';

function AssetInfoForm() {
  const dispatch = useDispatch();
  const assetInfo = useSelector(state => state.assetInfo);
  // console.log('asset:', assetInfo);

  const onValueChange = ({name, itemValue}) => {
    switch (name) {
      case 'assetType':
        dispatch(assetTypeSetValue(itemValue));
        break;
      case 'isAssetForDownPayment':
        dispatch(isAssetForDownPayment(itemValue));
      default:
        break;
    }
  };

  const createChangeTextHandler = name => value => {
    switch (name) {
      case 'assetDescription':
        dispatch(assetDescSetValue(value));
        break;
      case 'assetTotalValue':
        dispatch(assetTotValSetValue(value));
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tell us more about your assets:</Text>
      </View>
      <View style={styles.form}>
        <AssetForm
          assetInfo={assetInfo}
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

export default AssetInfoForm;
