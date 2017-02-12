import { browserHistory } from 'react-router';

const login = (
  state = {
    login: '',
    password: '',
    loginError: '',
    passwordError: ''
  },
  action
) => {
  switch(action.type) {
    case 'HANDLE_LOGIN_FORM_CHANGE':
      return Object.assign({}, state, {
        [action.name]: action.value,
        loginError: '',
        passwordError: ''
      });
    case 'LOGIN_ERROR':
      return Object.assign({}, state, {
        loginError: 'this login or password does not exists',
        passwordError: 'this login or password does not exists'
      });
    case 'LOGIN_SUCCESS':
      let data = {
        login: state.login,
      };
      localStorage.setItem('account', JSON.stringify(data));
      browserHistory.push('/home');
      return state;
    default:
      return state;
  }
};

export default login;