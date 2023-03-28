//Action Type Define
const ASSETTYPE_SETVALUE = 'assetInfo/ASSETTYPE_SETVALUE';
const ASSETDESC_SETVALUE = 'assetInfo/ASSETDESC_SETVALUE';
const ASSETTOTVAL_SETVALUE = 'assetInfo/ASSETTOTVAL_SETVALUE';
const ISASSETFORDOWNPAYMENt = 'assetInfo/ISASSETFORDOWNPAYMENt';

//Action Generator
export const assetTypeSetValue = value => ({
  type: ASSETTYPE_SETVALUE,
  value,
});
export const assetDescSetValue = value => ({
  type: ASSETDESC_SETVALUE,
  value,
});
export const assetTotValSetValue = value => ({
  type: ASSETTOTVAL_SETVALUE,
  value,
});
export const isAssetForDownPayment = value => ({
  type: ISASSETFORDOWNPAYMENt,
  value,
});

//Initial State
const initialState = {
  assetType: 'investment',
  assetDesc: '',
  assetTotalValue: '0',
  isAssetForDownPayment: 'yes',
};

//Reducer
function assetInfo(state = initialState, action) {
  switch (action.type) {
    case ASSETTYPE_SETVALUE:
      return {
        ...state,
        assetType: action.value,
      };
    case ASSETDESC_SETVALUE:
      return {
        ...state,
        assetDesc: action.value,
      };
    case ASSETTOTVAL_SETVALUE:
      return {
        ...state,
        assetTotalValue: action.value,
      };
    case ISASSETFORDOWNPAYMENt:
      return {
        ...state,
        isAssetForDownPayment: action.value,
      };
    default:
      return state;
  }
}

export default assetInfo;
