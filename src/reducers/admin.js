import { combineReducers } from 'redux';
import adminMatches from './adminMatches';
import adminBets from './adminBets';

const admin = combineReducers({
  adminMatches,
  adminBets
});

export default admin;