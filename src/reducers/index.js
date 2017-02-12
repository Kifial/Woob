import { combineReducers } from 'redux';
import forms from './forms';
import account from './account';
import popups from './popups';
import home from './home';

export const app = combineReducers({
  forms,
  popups,
  account,
  home
});