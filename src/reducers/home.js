const home = (
  state = {
    items: [],
    filter: 'all'
  },
  action
) => {
  switch(action.type) {
    case 'SET_MATCH_ITEMS':
      return Object.assign({}, state, { items: action.items });
    case 'SET_HOME_FILTER':
      return Object.assign({}, state, { filter: action.filter });
    default:
      return state;
  }
};

export default home;