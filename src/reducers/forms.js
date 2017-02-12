import { combineReducers } from 'redux';
import registration from './registration';
import login from './login';

const forms = combineReducers({
  registration,
  login
});

export default forms;