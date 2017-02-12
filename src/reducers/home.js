const home = (
  state = {
    items: []
  },
  action
) => {
  switch(action.type) {
    case 'SET_MATCH_ITEMS':
      return Object.assign({}, state, { items: action.data });
    default:
      return state;
  }
};

export default home;