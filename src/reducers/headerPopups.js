const headerPopups = (
  state = {
    userPopupHidden: true
  },
  action
) => {
  switch(action.type) {
    case 'TRIGGER_USER_POPUP':
      return Object.assign({}, state, { userPopupHidden: !state.userPopupHidden });
    case 'HANDLE_USER_LOG_OUT':
      return Object.assign({}, state, { userPopupHidden: true });
    default:
      return state;
  }
};

export default headerPopups;