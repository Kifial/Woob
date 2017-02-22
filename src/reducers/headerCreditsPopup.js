const headerCreditsPopup = (
  state = {
    creditInput: '',
    hidden: true
  },
  action
) => {
  switch(action.type) {
    case 'HEADER_POPUP_HANDLE_INPUT':
      return Object.assign({}, state, {
        [action.name]: action.value
      });
    case 'TRIGGER_CREDITS_POPUP':
      return Object.assign({}, state, {
        hidden: !state.hidden
      });
    case 'CREDITS_POPUP_SUCCESS':
      return Object.assign({}, state, {
        hidden: true,
        creditInput: ''
      });
    default:
      return state;
  }
};

export default headerCreditsPopup;