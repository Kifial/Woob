import { validateRegistrationInput } from '../actions/forms';
import { browserHistory } from 'react-router';

const registration = (
  state = {
    login: '',
    password: '',
    confirm: '',
    loginError: '',
    passwordError: '',
    confirmError: '',
    loginOk: '',
    passwordOk: '',
    confirmOk: ''
  },
  action
) => {
  switch(action.type) {
    case 'HANDLE_REGISTRATION_FORM_CHANGE':
      return Object.assign({}, state, { [action.name]: action.value });
    case 'VALIDATE_REGISTRATION_INPUT':
      let result = validateRegistrationInput(state.login, state.password, state.confirm);
      return Object.assign({}, state, { ...result });
    case 'REGISTRATION_FORM_USER_EXISTS':
      return Object.assign({}, state, {
        login: '',
        loginOk: '',
        loginError: 'user with this login or password already exists'
      });
    case 'HANDLE_REGISTRATION_FORM_SUBMIT_ERRORS':
      let loginError =
        action.login ?
          'login must contain only letters, digits and "_", also be from 4 to 16 at length' :
          '';
      let passwordError =
        action.password ?
          'password must contain only letters, digits and "_", also be from 6 to 32 at length' :
          '';
      let confirmError =
        action.confirm ?
          'you should check your password and rewrite it' :
          '';
      return Object.assign({}, state, { loginError, passwordError, confirmError });
    case 'REGISTRATION_FORM_SUCCESSFUL':
      let data = {
        login: state.login
      };
      localStorage.setItem('account', JSON.stringify(data));
      browserHistory.push('/home');
      return state;
    default:
      return state;
  }
};

export default registration;