import React, {useEffect, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import {useUserContext} from '../contexts/UserContext';
import Avatar from '../components/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import BasicInfoForm from '../components/BasicInfoForm';
import PropertyInfoForm from '../components/PropertyInfoForm';
import AssetInfoForm from '../components/AssetInfoForm';
import IncomeInfoForm from '../components/IncomeInfoForm';
import TitledDropdown from '../components/TitledDropdown';
import OtherPropInfoForm from '../components/OtherPropInfoForm';
import InvolvedProfInfoForm from '../components/InvolvedProfInfoForm';
import {hasOtherPropertySetValue} from '../modules/otherPropInfo';
import {hasProfessSetValue} from '../modules/professInfo';
import {useMutation, useQueryClient} from 'react-query';
import {addApplication} from '../api/application';

function SimReqScreen({navigation, route}) {
  const {stage} = route.params ?? {stage: 'BASIC'};
  const {user} = useUserContext();
  const hasData = user !== null;
  const cid = user?._id;
  // console.log('cid:', cid);
  const queryClient = useQueryClient();
  const {mutate: autoSimulation} = useMutation(addApplication, {
    onSuccess: data => {
      // console.log('autoSimulation success:', data);
      setForm({...initialState});
      queryClient.invalidateQueries('applicatonsByCid');
      navigation.navigate('SimResult', data);
    },
  });
  // const isFirstValue = useSelector(state => state.basicInfo.isFirstValue);
  const dispatch = useDispatch();
  const basicInfo = useSelector(state => state.basicInfo);
  const assetInfo = useSelector(state => state.assetInfo);
  const incomeInfo = useSelector(state => state.incomeInfo);
  const propertyInfo = useSelector(state => state.propertyInfo);
  const otherPropInfo = useSelector(state => state.otherPropInfo);
  const professInfo = useSelector(state => state.professInfo);
  // console.log('hasProfessional:', hasProfessional);
  const initialState = {
    clientInfo: {},
    downPaymentValue: '15000',
    province: 'ON',
    intendedUseOfProperty: '',
    address: {},
    assets: [],
    incomes: [],
    properties: [],
    professionals: [],
  };

  const [form, setForm] = useState(initialState);

  let isValid = true;
  const validateAddress = info => {
    // console.log('info:', info);
    if (info.address.streetNumber === '') {
      Alert.alert('Fail', 'Input your streetNumber.');
      return false;
    }

    // if (info.address.unit === '') {
    //   Alert.alert('Fail', 'Input your unit.');
    //   return false;
    // }
    if (info.address.streetName === '') {
      Alert.alert('Fail', 'Input your streetName.');
      return false;
    }
    if (info.address.city === '') {
      Alert.alert('Fail', 'Input your city.');
      return false;
    }
    if (info.address.province === '') {
      Alert.alert('Fail', 'Input your Province.');
      return false;
    }
    if (info.address.country === '') {
      Alert.alert('Fail', 'Input your Country.');
      return false;
    }
    if (info.address.postalCode === '') {
      Alert.alert('Fail', 'Input your Postal Code.');
      return false;
    }
    return true;
  };

  const validateDate = () => {
    if (incomeInfo.workStartDate === '') {
      Alert.alert('Fail', 'Input your Start Date.');
      return false;
    }
    return true;
  };

  const validateProfess = () => {
    if (professInfo.professionalName === '') {
      Alert.alert('Fail', 'Input name filed.');
      return false;
    }
    if (professInfo.professionalEmail === '') {
      Alert.alert('Fail', 'Input Email filed.');
      return false;
    }
    if (professInfo.professionalWorkNum === '') {
      Alert.alert('Fail', 'Input Work Number filed.');
      return false;
    }
    return true;
  };

  let nextStage = '';
  const onNext = () => {
    switch (stage) {
      case 'BASIC':
        isValid = validateAddress(basicInfo);
        nextStage = 'PROPERTY';
        break;
      case 'PROPERTY':
        isValid = validateAddress(propertyInfo);
        nextStage = 'ASSET';
        break;
      case 'ASSET':
        nextStage = 'INCOME';
        break;
      case 'INCOME':
        if ((isValid = validateDate())) {
          isValid = validateAddress(incomeInfo);
        }
        nextStage = 'OTHER_PROPERTY';
        break;
      case 'OTHER_PROPERTY':
        if (otherPropInfo.hasOtherProperty) nextStage = 'OTHER_PROPERTY_DETAIL';
        else nextStage = 'INVOLVED_PROF';
        break;
      case 'OTHER_PROPERTY_DETAIL':
        isValid = validateAddress(otherPropInfo);
        nextStage = 'INVOLVED_PROF';

        break;
      case 'INVOLVED_PROF':
        if (professInfo.hasProfessional) nextStage = 'INVOLVED_PROF_DETAIL';
        else nextStage = 'SEND_FORM';
        break;
      case 'INVOLVED_PROF_DETAIL':
        isValid = validateProfess();
        nextStage = 'SEND_FORM';
        break;
      default:
        nextStage = 'BASIC';
    }
    if (isValid) {
      if (nextStage === 'SEND_FORM') {
        // console.log('Send Form:', form);

        const clientForm = {
          userId: cid,
          firstTimeBuyer: basicInfo.isFirstValue,
          maritalStatus: basicInfo.maritalValue,
          numberOfDependents: basicInfo.dependentsValue,
          currentAddress: basicInfo.address,
          passedAddresses: [],
        };

        const assetForm = {
          type: assetInfo.assetType,
          description: assetInfo.assetDesc,
          value: assetInfo.assetTotalValue,
          includedInDownPayment: assetInfo.isAssetForDownPayment,
        };

        const incomeForm = {
          type: incomeInfo.incomeType,
          description: incomeInfo.incomeDesc,
          businessType: incomeInfo.businessType,
          businessName: incomeInfo.businessName,
          businessAddress: incomeInfo.address,
          jobTitle: incomeInfo.jobTite,
          employmentType: incomeInfo.employmentType,
          paymentType: '',
          amount: incomeInfo.salary,
          startDate: incomeInfo.workStartDate,
        };

        const propertyForm = {
          address: otherPropInfo.address,
          value: 500000,
          annualPropertyTaxes: otherPropInfo.annualTax,
          // condoFees: 4000,
          monthlyPayment: otherPropInfo.monthlyPay,
        };

        const professForm = {
          type: professInfo.professionalType,
          fullName: professInfo.professionalName,
          email: professInfo.professionalEmail,
          workNumber: professInfo.professionalWorkNum,
          cost: professInfo.professionalcost,
        };

        // console.log('incomeinfo:', incomeInfo);

        const nextForm = {
          ...form,

          downPaymentValue: '15000',
          province: basicInfo.address.province,
          intendedUseOfProperty: propertyInfo.propertyType,
          clientInfo: clientForm,
          address: propertyInfo.address,
          assets: form.assets.concat(assetForm),
          incomes: form.incomes.concat(incomeForm),
          // professionals: form.professionals.concat(professForm),
          // properties: form.properties.concat(propertyForm),
        };
        if (otherPropInfo.hasOtherProperty)
          nextForm.properties = form.properties.concat(propertyForm);
        if (professInfo.hasProfessional)
          nextForm.professionals = form.professionals.concat(professForm);
        // console.log('nextForm:', nextForm);
        autoSimulation(nextForm);
      } else navigation.push('SimRequest', {stage: nextStage});
    }
  };

  const onCancel = () => {
    setForm({...initialState});
    navigation.navigate('Home');
  };

  useEffect(() => {
    navigation.setOptions({
      title: `New Simulation`,
      headerStyle: {
        backgroundColor: '#14213D',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontSize: 20,
      },
      headerRight: () => (
        <View>
          {hasData ? (
            <Avatar style={styles.profile} source={user.photoURL} />
          ) : (
            <Avatar style={styles.profile} />
          )}
        </View>
      ),
    });
  }, [navigation, user]);

  return (
    <KeyboardAvoidingView style={styles.keyboradAvoidingView}>
      <SafeAreaView style={styles.fullscreen}>
        {{
          BASIC: <BasicInfoForm />,
          PROPERTY: <PropertyInfoForm />,
          ASSET: <AssetInfoForm />,
          INCOME: <IncomeInfoForm />,
          OTHER_PROPERTY: (
            <TitledDropdown
              title="Do you have other properties?"
              selectedValue={otherPropInfo.hasOtherProperty}
              onValueChange={(itemValue, itemIndex) =>
                dispatch(hasOtherPropertySetValue(itemValue))
              }
            />
          ),
          OTHER_PROPERTY_DETAIL: <OtherPropInfoForm />,
          INVOLVED_PROF: (
            <TitledDropdown
              title={`Do you have other professionals\ninvolvied in your process?`}
              isLong
              selectedValue={professInfo.hasProfessional}
              onValueChange={(itemValue, itemIndex) =>
                dispatch(hasProfessSetValue(itemValue))
              }
            />
          ),
          INVOLVED_PROF_DETAIL: <InvolvedProfInfoForm />,
        }[stage] || <BasicInfoForm />}

        <View style={styles.rowButtons}>
          <View style={styles.rowButton}>
            <CustomButton title="Cancel" theme="secondary" onPress={onCancel} />
          </View>
          <View style={styles.rowButton}>
            <CustomButton title="Next" onPress={onNext} />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboradAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: '#14213D',
  },

  rowButton: {
    width: 150,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  profile: {
    marginVertical: 10,
  },
});

export default SimReqScreen;
