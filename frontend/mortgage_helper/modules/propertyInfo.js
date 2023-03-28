//Action Type Define
const PROPERTY_TYPE_SETVALUE = 'propertyInfo/PROPERTYTYPE_SETVALUE';
const PROPERTY_ADDR_STNUM_SETVALUE = 'propertyInfo/ADDR_STNUM_SETVALUE';
const PROPERTY_ADDR_STNAME_SETVALUE = 'propertyInfo/ADDR_STNAME_SETVALUE';
const PROPERTY_ADDR_UNIT_SETVALUE = 'propertyInfo/ADDR_UNIT_SETVALUE';
const PROPERTY_ADDR_CITY_SETVALUE = 'propertyInfo/ADDR_CITY_SETVALUE';
const PROPERTY_ADDR_PROV_SETVALUE = 'propertyInfo/ADDR_PROV_SETVALUE';
const PROPERTY_ADDR_COUNTRY_SETVALUE = 'propertyInfo/ADDR_COUNTRY_SETVALUE';
const PROPERTY_ADDR_POST_SETVALUE = 'propertyInfo/ADDR_POST_SETVALUE';

//Action Generator
export const propertyTypeSetValue = value => ({
  type: PROPERTY_TYPE_SETVALUE,
  value,
});
export const propertyAddrStNumSetValue = value => ({
  type: PROPERTY_ADDR_STNUM_SETVALUE,
  value,
});
export const propertyAddrStNameSetValue = value => ({
  type: PROPERTY_ADDR_STNAME_SETVALUE,
  value,
});
export const propertyAddrUnitSetValue = value => ({
  type: PROPERTY_ADDR_UNIT_SETVALUE,
  value,
});
export const propertyAddrCitySetValue = value => ({
  type: PROPERTY_ADDR_CITY_SETVALUE,
  value,
});
export const propertyAddrProvSetValue = value => ({
  type: PROPERTY_ADDR_PROV_SETVALUE,
  value,
});
export const propertyAddrCountrySetValue = value => ({
  type: PROPERTY_ADDR_COUNTRY_SETVALUE,
  value,
});
export const propertyAddrPostSetValue = value => ({
  type: PROPERTY_ADDR_POST_SETVALUE,
  value,
});

//Initial State
const initialState = {
  propertyType: 'own',
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
function propertyInfo(state = initialState, action) {
  switch (action.type) {
    case PROPERTY_TYPE_SETVALUE:
      return {
        ...state,
        propertyType: action.value,
      };
    case PROPERTY_ADDR_STNUM_SETVALUE:
      return {
        ...state,
        address: {...state.address, streetNumber: action.value},
      };
    case PROPERTY_ADDR_STNAME_SETVALUE:
      return {
        ...state,
        address: {...state.address, streetName: action.value},
      };
    case PROPERTY_ADDR_UNIT_SETVALUE:
      return {
        ...state,
        address: {...state.address, unit: action.value},
      };
    case PROPERTY_ADDR_CITY_SETVALUE:
      return {
        ...state,
        address: {...state.address, city: action.value},
      };
    case PROPERTY_ADDR_PROV_SETVALUE:
      return {
        ...state,
        address: {...state.address, province: action.value},
      };
    case PROPERTY_ADDR_COUNTRY_SETVALUE:
      return {
        ...state,
        address: {...state.address, country: action.value},
      };
    case PROPERTY_ADDR_POST_SETVALUE:
      return {
        ...state,
        address: {...state.address, postalCode: action.value},
      };
    default:
      return state;
  }
}

export default propertyInfo;
