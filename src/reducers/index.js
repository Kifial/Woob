import { combineReducers } from 'redux';
import forms from './forms';
import account from './account';
import popups from './popups';
import home from './home';
import admin from './admin';

export const app = combineReducers({
  forms,
  popups,
  account,
  home,
  admin
});