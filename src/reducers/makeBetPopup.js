const makeBetPopup = (
  state = {
    id: '',
    name: '',
    coeff: '',
    date: '',
    time: '',
    bet: '',
    winCredits: 0,
    creditsInput: '',
    hidden: true
  },
  action
) => {
  switch(action.type) {
    case 'MAKE_BET_POPUP_SET_INFO':
      return Object.assign({}, state, {
        id: action.id,
        name: action.name,
        coeff: action.coeff,
        date: action.date,
        time: action.time,
        bet: action.bet,
        hidden: false
      });
    case 'MAKE_BET_POPUP_TRIGGER':
      return Object.assign({}, state, {
        hidden: !state.hidden
      });
    case 'MAKE_BET_POPUP_HANDLE_INPUT':
      let winCredits = (+action.value * state.coeff).toFixed(2);
      return Object.assign({}, state, {
        [action.name]: action.value,
        winCredits
      });
    case 'BET_CREATED':
      return Object.assign({}, state, {
        id: '',
        name: '',
        coeff: '',
        date: '',
        time: '',
        bet: '',
        winCredits: 0,
        creditsInput: '',
        hidden: true
      });
    default:
      return state;
  }
};

export default makeBetPopup;