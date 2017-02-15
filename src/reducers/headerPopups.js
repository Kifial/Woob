const headerPopups = (
  state = {
    userPopupHidden: true
  },
  action
) => {
  switch(action.type) {
    case 'TRIGGER_USER_POPUP':
      return Object.assign({}, state, { userPopupHidden: !state.userPopupHidden });
    default:
      return state;
  }
};

export default headerPopups;