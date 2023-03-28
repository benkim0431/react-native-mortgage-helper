import React, {useEffect, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
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

// Body:
// {
//     "clientId": "63eb14f235d494f1634f47a8",
//     "downPaymentValue": "15000",
//     "province": "ON",
//     "intendedUseOfProperty": "Owned",
//     "address": {
//         "streetNumber": "220A",
//         "streetName": "Ira Needles Boulevard",
//         "unit": "801",
//         "city": "Kitchener",
//         "province": "ON",
//         "country": "Canada",
//         "postalCode": "N2N0C4",
//         "moveInDate": "2021/12/15"
//     },
//     "assets": [
//         {
//             "type": "Savings",
//             "value": "50000"
//         }
//     ],
//     "incomes": [
//         {
//             "type": "Employed",
//             "amount": "120000",
//             "startDate": "01/01/2023"
//         }
//     ],
//     "properties": [],
//     "professionals": []
// }

function SimReqScreen({navigation, route}) {
  const {stage} = route.params ?? {stage: 'BASIC'};
  const {user} = useUserContext();
  const hasData = user !== null;
  const cid = user?._id;
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
    clientId: cid,
    downPaymentValue: '0',
    province: 'ON',
    intendedUseOfProperty: '',
    address: {
      streetNumber: '',
      streetName: '',
      unit: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
      moveInDate: '',
    },
    assets: [],
    incomes: [],
    properties: [],
    professionals: [],
  };

  const [form, setForm] = useState(initialState);

  let nextStage = '';
  const onNext = () => {
    switch (stage) {
      case 'BASIC':
        nextStage = 'PROPERTY';
        break;
      case 'PROPERTY':
        nextStage = 'ASSET';
        break;
      case 'ASSET':
        nextStage = 'INCOME';
        break;
      case 'INCOME':
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
    if (nextStage === 'SEND_FORM') {
      console.log('Send Form');

      const asset = {
        type: assetInfo.assetType,
        value: assetInfo.assetTotalValue,
      };
      const income = {
        type: incomeInfo.incomeType,
        amount: incomeInfo.salary,
        startDate: incomeInfo.workStartDate,
      };

      const nextForm = {
        ...form,
        downPaymentValue: '15000',
        province: basicInfo.address.province,
        intendedUseOfProperty: propertyInfo.propertyType,
        address: basicInfo.address,
        assets: form.assets.concat(asset),
        incomes: form.incomes.concat(income),
      };
      console.log('nextForm:', nextForm);
      autoSimulation(nextForm);
    } else navigation.push('SimRequest', {stage: nextStage});
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
            <CustomButton title="Cancel" theme="secondary" />
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
