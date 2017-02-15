import { matchesSearchResults } from '../actions/admin';

const admin = (
  state = {
    allMatches: [],
    visibleMatches: [],
    selectedMatch: '',
    search: ''
  },
  action
) => {
  let index;
  let visibleMatches;
  let updatedVisibleMatch;
  let visibleMatchIndex;
  switch(action.type) {
    case 'ADMIN_SET_MATCHES':
      return Object.assign({}, state, {
        allMatches: action.data,
        visibleMatches: action.data
      });
    case 'ADMIN_MATCH_ADDED'://если соответствует поиску довавить в видимые
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
      return Object.assign({}, state, { selectedMatch: action.id });
    case 'ADMIN_HANDLE_UPDATE_MATCH':
      return Object.assign({}, state, { selectedMatch: '' });
    case 'ADMIN_HANDLE_MATCHES_SEARCH_INPUT':
      return Object.assign({}, state, { search: action.value });
    case 'ADMIN_HANDLE_SEARCH_RESULTS':
      let resultMatches = matchesSearchResults(state.allMatches, state.search);
      return Object.assign({}, state, { visibleMatches: resultMatches });
    default:
      return state;
  }
};

export default admin;