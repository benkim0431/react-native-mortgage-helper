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
    clientInfo: {
      userId: cid,
      firstTimeBuyer: 'Yes',
      maritalStatus: 'Married',
      numberOfDependents: 0,
      currentAddress: {
        streetNumber: '220A',
        streetName: 'Ira Needles Boulevard',
        unit: '801',
        city: 'Kitchener',
        province: 'ON',
        country: 'Canada',
        postalCode: 'N2N0C4',
        moveInDate: '2021/12/15',
      },
      passedAddresses: [],
    },
    downPaymentValue: '15000',
    province: 'ON',
    intendedUseOfProperty: '',
    address: {
      streetNumber: '220A',
      streetName: 'Ira Needles Boulevard',
      unit: '801',
      city: 'Kitchener',
      province: 'ON',
      country: 'Canada',
      postalCode: 'N2N0C4',
      moveInDate: '2021/12/15',
    },
    assets: [],
    incomes: [
      // {
      //   type: 'Employed',
      //   description: 'Test test',
      //   businessType: 'Software House',
      //   businessName: 'Test Software',
      //   businessAddress: {
      //     streetNumber: '630',
      //     streetName: 'University Street',
      //     city: 'Waterloo',
      //     province: 'ON',
      //     country: 'Canada',
      //     postalCode: 'N2N0C4',
      //   },
      //   jobTitle: 'Junior Developer',
      //   employmentType: 'Full Time',
      //   paymentType: 'Bimonthly',
      //   amount: 45000,
      //   startDate: '2023/01/01',
      // },
    ],
    properties: [],
    professionals: [],
  };

  const [form, setForm] = useState(initialState);

  let isValid = true;
  const validateAddress = () => {
    if (basicInfo.address.streetNumber === '') {
      Alert.alert('Fail', 'Input your streetNumber.');
      isValid = false;
      return;
    }

    if (basicInfo.address.unit === '') {
      Alert.alert('Fail', 'Input your unit.');
      isValid = false;
      return;
    }
    if (basicInfo.address.streetName === '') {
      Alert.alert('Fail', 'Input your streetName.');
      isValid = false;
      return;
    }
    if (basicInfo.address.city === '') {
      Alert.alert('Fail', 'Input your city.');
      isValid = false;
      return;
    }
    if (basicInfo.address.province === '') {
      Alert.alert('Fail', 'Input your Province.');
      isValid = false;
      return;
    }
    if (basicInfo.address.country === '') {
      Alert.alert('Fail', 'Input your Country.');
      isValid = false;
      return;
    }
    if (basicInfo.address.postalCode === '') {
      Alert.alert('Fail', 'Input your Postal Code.');
      isValid = false;
      return;
    }
  };

  const validateDate = () => {
    if (incomeInfo.workStartDate === '') {
      Alert.alert('Fail', 'Input your Start Date.');
      isValid = false;
      return;
    }
  };

  let nextStage = '';
  const onNext = () => {
    switch (stage) {
      case 'BASIC':
        validateAddress();
        nextStage = 'PROPERTY';
        break;
      case 'PROPERTY':
        validateAddress();
        nextStage = 'ASSET';
        break;
      case 'ASSET':
        nextStage = 'INCOME';
        break;
      case 'INCOME':
        validateAddress();
        validateDate();
        nextStage = 'OTHER_PROPERTY';
        break;
      case 'OTHER_PROPERTY':
        if (otherPropInfo.hasOtherProperty) nextStage = 'OTHER_PROPERTY_DETAIL';
        else nextStage = 'INVOLVED_PROF';
        break;
      case 'OTHER_PROPERTY_DETAIL':
        nextStage = 'INVOLVED_PROF';

        break;
      case 'INVOLVED_PROF':
        if (professInfo.hasProfessional) nextStage = 'INVOLVED_PROF_DETAIL';
        else nextStage = 'SEND_FORM';
        break;
      case 'INVOLVED_PROF_DETAIL':
        nextStage = 'SEND_FORM';
        break;
      default:
        nextStage = 'BASIC';
    }
    if (isValid) {
      if (nextStage === 'SEND_FORM') {
        // console.log('Send Form:', form);

        const clientForm = {
          ...form.clientInfo,
          currentAddress: basicInfo.address,
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

        // console.log('incomeinfo:', incomeInfo);

        const nextForm = {
          ...form,

          // downPaymentValue: '15000',
          // province: basicInfo.address.province,
          // intendedUseOfProperty: propertyInfo.propertyType,
          clientInfo: clientForm,
          address: propertyInfo.address,
          assets: form.assets.concat(assetForm),
          incomes: form.incomes.concat(incomeForm),
          // professionals: form.professionals.concat(professInfo),
          // properties: form.properties.concat({...propertyInfo}),
        };
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
