//Action Type Define
// companyName: 'Conestoga',
//       percentageFee: '0.01',
//       province: province,
const BROKERCOMPANYNAME_SETVALUE = 'brokerInfo/BROKERCOMPANYNAME_SETVALUE';
const BROKERPERCENTFEE_SETVALUE = 'brokerInfo/BROKERPERCENTFEE_SETVALUE';
const BROKERPROVINCE_SETVALUE = 'brokerInfo/BROKERPROVINCE_SETVALUE';

//Action Generator
export const brokerCompanySetValue = value => ({
  type: BROKERCOMPANYNAME_SETVALUE,
  value,
});

export const brokerPercentFeeSetValue = value => ({
  type: BROKERPERCENTFEE_SETVALUE,
  value,
});

export const borkerProvinceSetValue = value => ({
  type: BROKERPROVINCE_SETVALUE,
  value,
});

//Initial State
const initialState = {
  brokerCompanyName: '',
  brokerPercentageFee: '0',
  brokerProvince: 'AB',
};

//Reducer
function brokerInfo(state = initialState, action) {
  switch (action.type) {
    case BROKERCOMPANYNAME_SETVALUE:
      return {
        ...state,
        brokerCompanyName: action.value,
      };
    case BROKERPERCENTFEE_SETVALUE:
      return {
        ...state,
        brokerPercentageFee: action.value,
      };
    case BROKERPROVINCE_SETVALUE:
      return {
        ...state,
        brokerProvince: action.value,
      };
    default:
      return state;
  }
}

export default brokerInfo;
