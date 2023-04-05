import {combineReducers} from 'redux';
import basicInfo from './basicInfo';
import propertyInfo from './propertyInfo';
import assetInfo from './assetInfo';
import incomeInfo from './incomeInfo';
import otherPropInfo from './otherPropInfo';
import professInfo from './professInfo';
import brokerInfo from './brokerInfo';

const rootReducer = combineReducers({
  basicInfo,
  propertyInfo,
  assetInfo,
  incomeInfo,
  otherPropInfo,
  professInfo,
  brokerInfo,
});

export default rootReducer;
