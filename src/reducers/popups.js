import { combineReducers } from 'redux';
import headerPopups from './headerPopups';
import adminMatchesPopup from './adminMatchesPopup';
import headerCreditsPopup from './headerCreditsPopup';
import makeBetPopup from './makeBetPopup';
import setWinnerPopup from './setWinnerPopup';

const popups = combineReducers({
  headerPopups,
  adminMatchesPopup,
  headerCreditsPopup,
  makeBetPopup,
  setWinnerPopup
});

export default popups;