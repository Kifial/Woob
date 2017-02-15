import { submitAdminPopup, submitUpdateAdminPopup } from '../actions/api';

const adminMatchesPopup = (
  state = {
    hidden: true,
    nameA: '',
    coeffA: '',
    nameB: '',
    coeffB: '',
    date: '',
    time: '',
    isUpdate: false,
    id: ''
  },
  action
) => {
    let data;
  switch(action.type) {
    case 'ADMIN_TRIGGER_MATCH_POPUP':
      return Object.assign({}, state, { hidden: !state.hidden });
    case 'ADMIN_HANDLE_MATCHES_POPUP_INPUT':
      return Object.assign({}, state, { [action.name]: action.value });
    case 'ADMIN_SUBMIT_MATCHES_POPUP':
      data = {
        nameA: state.nameA,
        coeffA: state.coeffA,
        nameB: state.nameB,
        coeffB: state.coeffB,
        date: state.date,
        time: state.time
      };
      submitAdminPopup(data, action.dispatch);
      return state;
    case 'ADMIN_SUBMIT_UPDATE_MATCHES_POPUP':
      data = {
        nameA: state.nameA,
        coeffA: state.coeffA,
        nameB: state.nameB,
        coeffB: state.coeffB,
        date: state.date,
        time: state.time,
        id: state.id
      };
      submitUpdateAdminPopup(data, action.dispatch);
      return state;
    case 'ADMIN_MATCH_NOT_ADDED':
      return state;
    case 'ADMIN_MATCH_ADDED':
      return Object.assign({}, state, {
        hidden: true,
        nameA: '',
        coeffA: '',
        nameB: '',
        coeffB: '',
        date: '',
        time: '',
        isUpdate: false,
        id: ''
      });
    case 'ADMIN_MATCH_UPDATED':
      return Object.assign({}, state, {
        hidden: true,
        nameA: '',
        coeffA: '',
        nameB: '',
        coeffB: '',
        date: '',
        time: '',
        isUpdate: false,
        id: ''
      });
    case 'ADMIN_HANDLE_UPDATE_MATCH':
      return Object.assign({}, state, {
        hidden: false,
        nameA: action.data.A.name,
        coeffA: action.data.A.coeff,
        nameB: action.data.B.name,
        coeffB: action.data.B.coeff,
        date: action.data.date,
        time: action.data.time,
        isUpdate: true,
        id: action.data._id
      });
    default:
      return state;
  }
};

export default adminMatchesPopup;