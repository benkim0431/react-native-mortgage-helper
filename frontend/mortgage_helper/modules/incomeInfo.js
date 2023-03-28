//Action Type Define
const INCOMETYPE_SETVALUE = 'incomeInfo/INCOMETYPE_SETVALUE';
const INCOMEDESC_SETVALUE = 'incomeInfo/INCOMEDESC_SETVALUE';
const BUSINESSNAME_SETVALUE = 'incomeInfo/BUSINESSNAME_SETVALUE';
const BUSINESSTYPE_SETVALUE = 'incomeInfo/BUSINESSTYPE_SETVALUE';
const JOBTITLE_SETVALUE = 'incomeInfo/JOBTITLE_SETVALUE';
const EMPTYPE_SETVALUE = 'incomeInfo/EMPTYPE_SETVALUE';
const SALARY_SETVALUE = 'incomeInfo/SALARY_SETVALUE';
const WORKSTARTDATE_SETVALUE = 'incomeInfo/WORKSTARTDATE_SETVALUE';
const INCOME_ADDR_STNUM_SETVALUE = 'incomeInfo/ADDR_STNUM_SETVALUE';
const INCOME_ADDR_STNAME_SETVALUE = 'incomeInfo/ADDR_STNAME_SETVALUE';
const INCOME_ADDR_UNIT_SETVALUE = 'incomeInfo/ADDR_UNIT_SETVALUE';
const INCOME_ADDR_CITY_SETVALUE = 'incomeInfo/ADDR_CITY_SETVALUE';
const INCOME_ADDR_PROV_SETVALUE = 'incomeInfo/ADDR_PROV_SETVALUE';
const INCOME_ADDR_COUNTRY_SETVALUE = 'incomeInfo/ADDR_COUNTRY_SETVALUE';
const INCOME_ADDR_POST_SETVALUE = 'incomeInfo/ADDR_POST_SETVALUE';

//Action Generator
export const incomeTypeSetValue = value => ({
  type: INCOMETYPE_SETVALUE,
  value,
});
export const incomeDescSetValue = value => ({
  type: INCOMEDESC_SETVALUE,
  value,
});
export const businessNameSetValue = value => ({
  type: BUSINESSNAME_SETVALUE,
  value,
});
export const businessTypeSetValue = value => ({
  type: BUSINESSTYPE_SETVALUE,
  value,
});
export const jobTitleSetValue = value => ({
  type: JOBTITLE_SETVALUE,
  value,
});
export const empTypeSetValue = value => ({
  type: EMPTYPE_SETVALUE,
  value,
});
export const salarySetValue = value => ({
  type: SALARY_SETVALUE,
  value,
});
export const workStartDateSetValue = value => ({
  type: WORKSTARTDATE_SETVALUE,
  value,
});
export const incomeAddrStNumSetValue = text => ({
  type: INCOME_ADDR_STNUM_SETVALUE,
  text,
});
export const incomeAddrStNameSetValue = text => ({
  type: INCOME_ADDR_STNAME_SETVALUE,
  text,
});
export const incomeAddrUnitSetValue = text => ({
  type: INCOME_ADDR_UNIT_SETVALUE,
  text,
});
export const incomeAddrCitySetValue = text => ({
  type: INCOME_ADDR_CITY_SETVALUE,
  text,
});
export const incomeAddrProvSetValue = value => ({
  type: INCOME_ADDR_PROV_SETVALUE,
  value,
});
export const incomeAddrCountrySetValue = text => ({
  type: INCOME_ADDR_COUNTRY_SETVALUE,
  text,
});
export const incomeAddrPostSetValue = text => ({
  type: INCOME_ADDR_POST_SETVALUE,
  text,
});

//Initial State
const initialState = {
  incomeType: 'employed',
  incomeDesc: '',
  businessName: '',
  businessType: '',
  jobTite: '',
  employmentType: '',
  salary: '0',
  workStartDate: '',
  address: {
    streetNumber: '',
    streetName: '',
    unit: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
  },
};

//Reducer
function incomeInfo(state = initialState, action) {
  switch (action.type) {
    case INCOMETYPE_SETVALUE:
      return {
        ...state,
        incomeType: action.value,
      };
    case INCOMEDESC_SETVALUE:
      return {
        ...state,
        incomeDesc: action.value,
      };
    case BUSINESSNAME_SETVALUE:
      return {
        ...state,
        businessName: action.value,
      };
    case BUSINESSTYPE_SETVALUE:
      return {
        ...state,
        businessType: action.value,
      };
    case JOBTITLE_SETVALUE:
      return {
        ...state,
        jobTite: action.value,
      };
    case EMPTYPE_SETVALUE:
      return {
        ...state,
        employmentType: action.value,
      };
    case SALARY_SETVALUE:
      return {
        ...state,
        salary: action.value,
      };
    case WORKSTARTDATE_SETVALUE:
      return {
        ...state,
        workStartDate: action.value,
      };
    case INCOME_ADDR_STNUM_SETVALUE:
      return {
        ...state,
        address: {...state.address, streetNumber: action.text},
      };
    case INCOME_ADDR_STNAME_SETVALUE:
      return {
        ...state,
        address: {...state.address, streetName: action.text},
      };
    case INCOME_ADDR_UNIT_SETVALUE:
      return {
        ...state,
        address: {...state.address, unit: action.text},
      };
    case INCOME_ADDR_CITY_SETVALUE:
      return {
        ...state,
        address: {...state.address, city: action.text},
      };
    case INCOME_ADDR_PROV_SETVALUE:
      return {
        ...state,
        address: {...state.address, province: action.value},
      };
    case INCOME_ADDR_COUNTRY_SETVALUE:
      return {
        ...state,
        address: {...state.address, country: action.text},
      };
    case INCOME_ADDR_POST_SETVALUE:
      return {
        ...state,
        address: {...state.address, postalCode: action.text},
      };
    default:
      return state;
  }
}

export default incomeInfo;
