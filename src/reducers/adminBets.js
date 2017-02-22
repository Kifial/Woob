const adminBets = (
  state = {
    allItems: [],
    visibleItems: [],
    search: ''
  },
  action
) => {
  switch(action.type) {
    case 'SET_ADMIN_BETS':
      return Object.assign({}, state, {
        allItems: action.items,
        visibleItems: action.items
      });
    default:
      return state;
  }
};

export default adminBets;