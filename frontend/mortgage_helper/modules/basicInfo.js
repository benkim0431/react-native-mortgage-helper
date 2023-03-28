//Action Type Define
const ISFIRST_SETVALUE = 'basicInfo/ISFIRST_SETVALUE';
const MARITAL_SETVALUE = 'basicInfo/MARITAL_SETVALUE';
const DEPENDENTS_SETVALUE = 'basicInfo/DEPENDENTS_SETVALUE';
const BASIC_ADDR_STNUM_SETVALUE = 'basicInfo/ADDR_STNUM_SETVALUE';
const BASIC_ADDR_STNAME_SETVALUE = 'basicInfo/ADDR_STNAME_SETVALUE';
const BASIC_ADDR_UNIT_SETVALUE = 'basicInfo/ADDR_UNIT_SETVALUE';
const BASIC_ADDR_CITY_SETVALUE = 'basicInfo/ADDR_CITY_SETVALUE';
const BASIC_ADDR_PROV_SETVALUE = 'basicInfo/ADDR_PROV_SETVALUE';
const BASIC_ADDR_COUNTRY_SETVALUE = 'basicInfo/ADDR_COUNTRY_SETVALUE';
const BASIC_ADDR_POST_SETVALUE = 'basicInfo/ADDR_POST_SETVALUE';
const BASIC_ADDR_CURRENT_SETVALUE = 'basicInfo/ADDR_CURRENT_SETVALUE';
const BASIC_ADDR_MIDATE_SETVALUE = 'basicInfo/ADDR_MIDATE_SETVALUE';

//Action Generator
export const isFirstSetValue = value => ({
  type: ISFIRST_SETVALUE,
  value,
});
export const maritalSetValue = value => ({
  type: MARITAL_SETVALUE,
  value,
});
export const dependentsSetValue = value => ({
  type: DEPENDENTS_SETVALUE,
  value,
});
export const basicAddrStNumSetValue = text => ({
  type: BASIC_ADDR_STNUM_SETVALUE,
  text,
});
export const basicAddrStNameSetValue = text => ({
  type: BASIC_ADDR_STNAME_SETVALUE,
  text,
});
export const basicAddrUnitSetValue = text => ({
  type: BASIC_ADDR_UNIT_SETVALUE,
  text,
});
export const basicAddrCitySetValue = text => ({
  type: BASIC_ADDR_CITY_SETVALUE,
  text,
});
export const basicAddrProvSetValue = value => ({
  type: BASIC_ADDR_PROV_SETVALUE,
  value,
});
export const basicAddrCountrySetValue = text => ({
  type: BASIC_ADDR_COUNTRY_SETVALUE,
  text,
});
export const basicAddrPostSetValue = text => ({
  type: BASIC_ADDR_POST_SETVALUE,
  text,
});
export const basicAddrCurRentSetValue = text => ({
  type: BASIC_ADDR_CURRENT_SETVALUE,
  text,
});

export const basicAddrMIDateSetValue = text => ({
  type: BASIC_ADDR_MIDATE_SETVALUE,
  text,
});

//Initial State
const initialState = {
  isFirstValue: 'yes',
  maritalValue: 'marriage',
  dependentsValue: '0',
  address: {
    streetNumber: '',
    streetName: '',
    unit: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
    currentRent: '',
    moveInDate: '',
  },
};

//Reducer
function basicInfo(state = initialState, action) {
  switch (action.type) {
    case ISFIRST_SETVALUE:
      return {
        ...state,
        isFirstValue: action.value,
      };
    case MARITAL_SETVALUE:
      return {
        ...state,
        maritalValue: action.value,
      };
    case DEPENDENTS_SETVALUE:
      return {
        ...state,
        dependentsValue: action.value,
      };
    case BASIC_ADDR_STNUM_SETVALUE:
      return {
        ...state,
        address: {...state.address, streetNumber: action.text},
      };
    case BASIC_ADDR_STNAME_SETVALUE:
      return {
        ...state,
        address: {...state.address, streetName: action.text},
      };
    case BASIC_ADDR_UNIT_SETVALUE:
      return {
        ...state,
        address: {...state.address, unit: action.text},
      };
    case BASIC_ADDR_CITY_SETVALUE:
      return {
        ...state,
        address: {...state.address, city: action.text},
      };
    case BASIC_ADDR_PROV_SETVALUE:
      return {
        ...state,
        address: {...state.address, province: action.value},
      };
    case BASIC_ADDR_COUNTRY_SETVALUE:
      return {
        ...state,
        address: {...state.address, country: action.text},
      };
    case BASIC_ADDR_POST_SETVALUE:
      return {
        ...state,
        address: {...state.address, postalCode: action.text},
      };
    case BASIC_ADDR_CURRENT_SETVALUE:
      return {
        ...state,
        address: {...state.address, currentRent: action.text},
      };
    case BASIC_ADDR_MIDATE_SETVALUE:
      return {
        ...state,
        address: {...state.address, moveInDate: action.text},
      };
    default:
      return state;
  }
}

export default basicInfo;
