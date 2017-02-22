const bets = (
  state = {
    items: []
  },
  action
) => {
  var index = 0;
  switch(action.type) {
    case 'SET_BETS_ITEMS':
      return Object.assign({}, state, {
        items: action.items
      });
    case 'BET_SUBMITTED':
      state.items.forEach((item, i) => {
        if (item.id == action.id) {
          index = i;
          return 0;
        }
      });
      return Object.assign({}, state, {
        items: [
          ...state.items.slice(0, index),
          ...state.items.slice(index + 1)
        ]
      });
    default:
      return state;
  }
};

export default bets;