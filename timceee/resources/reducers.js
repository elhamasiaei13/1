import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer} from 'redux-form';
import config from 'config/reducers';
import Forms from 'services/decorators/form/Module';
import General from 'routes/General/Module';
import Payroll from 'routes/Home/Payroll/Module';
import FormBuilder from 'components/FormBuilder/reducers';

const reducers = combineReducers({
  routing: routerReducer,
  form: reducer,
  Forms,
  General,
  Payroll,
  FormBuilder,
  ...config.reducers,
});

module.exports = reducers;
