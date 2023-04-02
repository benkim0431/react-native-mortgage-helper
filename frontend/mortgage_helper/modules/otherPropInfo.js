// Action Type Define
const HASOTHERPROPERTY_SETVALUE = 'otherPropertyInfo/HASOTHERPROPERTY_SETVALUE';
const OTHERPROPERTY_ADDR_STNUM_SETVALUE =
  'otherPropertyInfo/ADDR_STNUM_SETVALUE';
const OTHERPROPERTY_ADDR_STNAME_SETVALUE =
  'otherPropertyInfo/ADDR_STNAME_SETVALUE';
const OTHERPROPERTY_ADDR_UNIT_SETVALUE = 'otherPropertyInfo/ADDR_UNIT_SETVALUE';
const OTHERPROPERTY_ADDR_CITY_SETVALUE = 'otherPropertyInfo/ADDR_CITY_SETVALUE';
const OTHERPROPERTY_ADDR_PROV_SETVALUE = 'otherPropertyInfo/ADDR_PROV_SETVALUE';
const OTHERPROPERTY_ADDR_COUNTRY_SETVALUE =
  'otherPropertyInfo/ADDR_COUNTRY_SETVALUE';
const OTHERPROPERTY_ADDR_POST_SETVALUE = 'otherPropertyInfo/ADDR_POST_SETVALUE';
const OTHERPROPERTY_ANNUALTAX_SETVALUE =
  'otherPropertyInfo/OTHERPROPERTY_ANNUALTAX_SETVALUE';
const OTHERPROPERTY_MONTHLYPAY_SETVALUE =
  'otherPropertyInfo/OTHERPROPERTY_MONTHLYPAY_SETVALUE';

//Action Generator
export const hasOtherPropertySetValue = value => ({
  type: HASOTHERPROPERTY_SETVALUE,
  value,
});
export const otherPropertyAddrStNumSetValue = value => ({
  type: OTHERPROPERTY_ADDR_STNUM_SETVALUE,
  value,
});
export const otherPropertyAddrStNameSetValue = value => ({
  type: OTHERPROPERTY_ADDR_STNAME_SETVALUE,
  value,
});
export const otherPropertyAddrUnitSetValue = value => ({
  type: OTHERPROPERTY_ADDR_UNIT_SETVALUE,
  value,
});
export const otherPropertyAddrCitySetValue = value => ({
  type: OTHERPROPERTY_ADDR_CITY_SETVALUE,
  value,
});
export const otherPropertyAddrProvSetValue = value => ({
  type: OTHERPROPERTY_ADDR_PROV_SETVALUE,
  value,
});
export const otherPropertyAddrCountrySetValue = value => ({
  type: OTHERPROPERTY_ADDR_COUNTRY_SETVALUE,
  value,
});
export const otherPropertyAddrPostSetValue = value => ({
  type: OTHERPROPERTY_ADDR_POST_SETVALUE,
  value,
});
export const otherPropertyAnnualTaxSetValue = value => ({
  type: OTHERPROPERTY_ANNUALTAX_SETVALUE,
  value,
});
export const otherPropertyMonthlyPaySetValue = value => ({
  type: OTHERPROPERTY_MONTHLYPAY_SETVALUE,
  value,
});

//Initial State
const initialState = {
  hasOtherProperty: true,
  address: {
    streetNumber: '',
    streetName: '',
    unit: '',
    city: '',
    province: 'AB',
    country: '',
    postalCode: '',
  },
  annualTax: '0',
  monthlyPay: '',
};

//Reducer
function otherPropInfo(state = initialState, action) {
  switch (action.type) {
    case HASOTHERPROPERTY_SETVALUE:
      return {
        ...state,
        hasOtherProperty: action.value,
      };
    case OTHERPROPERTY_ADDR_STNUM_SETVALUE:
      return {
        ...state,
        address: {...state.address, streetNumber: action.value},
      };
    case OTHERPROPERTY_ADDR_STNAME_SETVALUE:
      return {
        ...state,
        address: {...state.address, streetName: action.value},
      };
    case OTHERPROPERTY_ADDR_UNIT_SETVALUE:
      return {
        ...state,
        address: {...state.address, unit: action.value},
      };
    case OTHERPROPERTY_ADDR_CITY_SETVALUE:
      return {
        ...state,
        address: {...state.address, city: action.value},
      };
    case OTHERPROPERTY_ADDR_PROV_SETVALUE:
      return {
        ...state,
        address: {...state.address, province: action.value},
      };
    case OTHERPROPERTY_ADDR_COUNTRY_SETVALUE:
      return {
        ...state,
        address: {...state.address, country: action.value},
      };
    case OTHERPROPERTY_ADDR_POST_SETVALUE:
      return {
        ...state,
        address: {...state.address, postalCode: action.value},
      };
    case OTHERPROPERTY_ANNUALTAX_SETVALUE:
      return {
        ...state,
        annualTax: action.value,
      };
    case OTHERPROPERTY_MONTHLYPAY_SETVALUE:
      return {
        ...state,
        monthlyPay: action.value,
      };
    default:
      return state;
  }
}

export default otherPropInfo;
