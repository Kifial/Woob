import { combineReducers } from 'redux';
import headerPopups from './headerPopups';
import adminMatchesPopup from './adminMatchesPopup';

const popups = combineReducers({
  headerPopups,
  adminMatchesPopup
});

export default popups;