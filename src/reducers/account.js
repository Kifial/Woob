import { browserHistory } from 'react-router';

const account = (
  state = {
    login: '',
    credits: '0.00',
    admin: false
  },
  action
) => {
  switch(action.type) {
    case 'SET_USER_INFO':
      return Object.assign({}, state, {
        login: action.data.login,
        credits: action.data.credits,
        admin: action.admin
      });
    case 'SET_ACCOUNT_LOGIN':
      return Object.assign({}, state, {
        login: action.login
      });
    case 'HANDLE_USER_LOG_OUT':
      localStorage.setItem('account', '');
      browserHistory.push('/welcome');
      return Object.assign({}, state, {
        login: '',
        credits: '0.00',
        admin: false
      });
    default:
      return state;
  }
};

export default account;