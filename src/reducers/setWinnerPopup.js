const setWinnerPopup = (
  state = {
    hidden: true,
    id: '',
    nameA: '',
    nameB: '',
    value: ''
  },
  action
) => {
  switch(action.type) {
    case 'WINNER_POPUP_SET_INFO':
      return Object.assign({}, state, {
        hidden: false,
        nameA: action.A,
        nameB: action.B,
        id: action.id
      });
    case 'WINNER_POPUP_HANDLE_CHECKBOX':
      return Object.assign({}, state, {
        value: action.value
      });
    case 'WINNER_POPUP_CLOSE':
      return Object.assign({}, state, {
        hidden: true,
        nameA: '',
        nameB: '',
        value: ''
      });
    default:
      return state;
  }
};

export default setWinnerPopup;