import {combineReducers} from 'redux';
import OrganizationChart from './OrganizationChart/Module';
import Personnel from './Personnel/Module';
import Roles from './Roles/Module';
import Setting from './Setting/reducers';

const reducers = combineReducers({
  OrganizationChart,
  Personnel,
  Roles,
  Setting,
});

export default reducers;
