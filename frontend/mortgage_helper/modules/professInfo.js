//Action Type Define
const HASPROFESS_SETVALUE = 'professInfo/HASPROFESS_SETVALUE';
const PROFESSTYPE_SETVALUE = 'professInfo/PROFESSTYPE_SETVALUE';
const PROFESSNAME_SETVALUE = 'professInfo/PROFESSNAME_SETVALUE';
const PROFESSEMAIL_SETVALUE = 'professInfo/PROFESSEMAIL_SETVALUE';
const PROFESSWORKNUM_SETVALUE = 'porfessInfo/PROFESSWORKNUM_SETVALUE';
const PROFESSCOST_SETVALUE = 'porfessInfo/PROFESSCOST_SETVALUE';

//Action Generator
export const hasProfessSetValue = value => ({
  type: HASPROFESS_SETVALUE,
  value,
});
export const professTypeSetValue = value => ({
  type: PROFESSTYPE_SETVALUE,
  value,
});
export const professNameSetValue = value => ({
  type: PROFESSNAME_SETVALUE,
  value,
});
export const professEmailSetValue = value => ({
  type: PROFESSEMAIL_SETVALUE,
  value,
});
export const professWorkNumSetValue = value => ({
  type: PROFESSWORKNUM_SETVALUE,
  value,
});
export const professCostSetValue = value => ({
  type: PROFESSCOST_SETVALUE,
  value,
});

//Initial State
const initialState = {
  hasProfessional: true,
  professionalType: 'realtor',
  professionalName: '',
  professionalEmail: '',
  professionalWorkNum: '',
  professionalcost: '0',
};

//Reducer
function professInfo(state = initialState, action) {
  switch (action.type) {
    case HASPROFESS_SETVALUE:
      return {
        ...state,
        hasProfessional: action.value,
      };
    case PROFESSTYPE_SETVALUE:
      return {
        ...state,
        professionalType: action.value,
      };
    case PROFESSNAME_SETVALUE:
      return {
        ...state,
        professionalName: action.value,
      };
    case PROFESSEMAIL_SETVALUE:
      return {
        ...state,
        professionalEmail: action.value,
      };
    case PROFESSWORKNUM_SETVALUE:
      return {
        ...state,
        professionalWorkNum: action.value,
      };
    case PROFESSCOST_SETVALUE:
      return {
        ...state,
        professionalcost: action.value,
      };
    default:
      return state;
  }
}

export default professInfo;
