import { browserHistory } from 'react-router';

const account = (
  state = {
    login: '',
    credits: '0.00'
  },
  action
) => {
  switch(action.type) {
    case 'SET_USER_INFO':
      return Object.assign({}, state, {
        login: action.data.login,
        credits: action.data.credits
      });
    case 'HANDLE_USER_LOG_OUT':
      localStorage.setItem('account', '');
      browserHistory.push('/welcome');
      return Object.assign({}, state, {
        login: '',
        credits: '0.00'
      });
    default:
      return state;
  }
};

export default account;