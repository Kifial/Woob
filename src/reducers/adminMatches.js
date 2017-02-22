import { matchesSearchResults, sortByClosestDate, sortByFarestDate } from '../actions/admin';

const adminMatches = (
  state = {
    allMatches: [],
    visibleMatches: [],
    selectedMatch: '',
    selectedMatchA: '',
    selectedMatchB: '',
    search: '',
    sortByDateType: 'closest'
  },
  action
) => {
  let index;
  let visibleMatches;
  let allMatches;
  let updatedVisibleMatch;
  let visibleMatchIndex;
  switch(action.type) {
    case 'ADMIN_SET_MATCHES':
      return Object.assign({}, state, {
        allMatches: action.data,
        visibleMatches: action.data
      });
    case 'ADMIN_MATCH_ADDED':
      visibleMatches = matchesSearchResults([action.data], state.search);
      return Object.assign({}, state, {
        allMatches: [
          action.data,
          ...state.allMatches
        ],
        visibleMatches: [
          ...visibleMatches,
          ...state.visibleMatches
        ]
      });
    case 'ADMIN_MATCH_UPDATED':
      let updatedItem = {
        A: {},
        B: {}
      };
      for (let i = 0; i < state.allMatches.length; i++) {
        if (state.allMatches[i]._id == action.data.id) {
          updatedItem = {
            A: {
              name: action.data.nameA,
              coeff: action.data.coeffA,
            },
            B: {
              name: action.data.nameB,
              coeff: action.data.coeffB
            },
            date: action.data.date,
            time: action.data.time,
            _id: action.data.id
          };
          index = i;
          break;
        }
      }
      for (let i = 0; i < state.visibleMatches.length; i++) {
        if (state.visibleMatches[i]._id == action.data.id) {
          updatedVisibleMatch = {
            A: {
              name: action.data.nameA,
              coeff: action.data.coeffA,
            },
            B: {
              name: action.data.nameB,
              coeff: action.data.coeffB
            },
            date: action.data.date,
            time: action.data.time,
            _id: action.data.id
          };
          visibleMatchIndex = i;
          break;
        }
      }
      return Object.assign({}, state, {
        allMatches: [
          ...state.allMatches.slice(0, index),
          updatedItem,
          ...state.allMatches.slice(index + 1)
        ],
        visibleMatches: [
          ...state.visibleMatches.slice(0, visibleMatchIndex),
          updatedVisibleMatch,
          ...state.visibleMatches.slice(visibleMatchIndex + 1)
        ]
      });
    case 'ADMIN_DELETE_MATCH':
      for (let i = 0; i < state.allMatches.length; i++) {
        if (state.allMatches[i]._id == action.id) {
          index = i;
          break;
        }
      }
      for (let i = 0; i < state.visibleMatches.length; i++) {
        if (state.visibleMatches[i]._id == action.id) {
          visibleMatchIndex = i;
          break;
        }
      }
      return Object.assign({}, state, {
        allMatches: [
          ...state.allMatches.slice(0, index),
          ...state.allMatches.slice(index + 1)
        ],
        visibleMatches: [
          ...state.visibleMatches.slice(0, visibleMatchIndex),
          ...state.visibleMatches.slice(visibleMatchIndex + 1)
        ],
        selectedMatch: ''
      });
    case 'ADMIN_HANDLE_MATCH_CLICK':
      return Object.assign({}, state, {
        selectedMatch: action.id,
        selectedMatchA: action.A,
        selectedMatchB: action.B
      });
    case 'ADMIN_HANDLE_UPDATE_MATCH':
      return Object.assign({}, state, { selectedMatch: '' });
    case 'ADMIN_HANDLE_MATCHES_SEARCH_INPUT':
      return Object.assign({}, state, { search: action.value });
    case 'ADMIN_HANDLE_SEARCH_RESULTS':
      let resultMatches = matchesSearchResults(state.allMatches, state.search);
      return Object.assign({}, state, { visibleMatches: resultMatches });
    case 'ADMIN_SORT_BY_CLOSEST_DATE':
      visibleMatches = sortByClosestDate(state.visibleMatches);
      allMatches = sortByClosestDate(state.allMatches);
      return Object.assign({}, state, {
        visibleMatches,
        allMatches,
        sortByDateType: 'closest'
      });
    case 'ADMIN_SORT_BY_FAREST_DATE':
      visibleMatches = sortByFarestDate(state.visibleMatches);
      allMatches = sortByFarestDate(state.allMatches);
      return Object.assign({}, state, {
        visibleMatches,
        allMatches,
        sortByDateType: 'farest'
      });
    case 'ADMIN_SET_WINNER':
      let allMatchesIndex = 0;
      let visibleMatchesIndex = 0;
      state.allMatches.forEach((item, i) => {
        if (item._id == state.selectedMatch) {
          allMatchesIndex = i;
          return 0;
        }
      });
      state.visibleMatches.forEach((item, i) => {
        if (item._id == state.selectedMatch) {
          visibleMatchesIndex = i;
          return 0;
        }
      });
      return Object.assign({}, state, {
        allMatches: [
          ...state.allMatches.slice(0, allMatchesIndex),
          Object.assign({}, state.allMatches[allMatchesIndex], {
            winner: action.winner
          }),
          ...state.allMatches.slice(allMatchesIndex + 1)
        ],
        visibleMatches: [
          ...state.visibleMatches.slice(0, visibleMatchesIndex),
          Object.assign({}, state.visibleMatches[visibleMatchesIndex], {
            winner: action.winner
          }),
          ...state.visibleMatches.slice(visibleMatchesIndex + 1)
        ]
      });
    default:
      return state;
  }
};

export default adminMatches;