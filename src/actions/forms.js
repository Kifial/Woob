export const validateRegistrationInput = (login, password, confirm) => {
  let loginError = '';
  let loginOk = '';
  let passwordError = '';
  let passwordOk = '';
  let confirmError = '';
  let confirmOk = '';
  if (login) {
    if (login.match(/^\w{4,16}$/)) {
      loginOk = 'login is OK';
    }  else {
      loginError = 'login must contain only letters, digits and "_", also be from 4 to 16 at length';
    }
  }
  if (password) {
    if (password.match(/^\w{6,32}$/)) {
      passwordOk = 'password is OK';
    } else {
      passwordError = 'password must contain only letters, digits and "_", also be from 6 to 32 at length';
    }
  }
  if (confirm) {
    if (confirm == password) {
      confirmOk = 'password is the same';
    } else {
      confirmError = 'you should check your password and rewrite it';
    }
  }
  return {
    loginError,
    loginOk,
    passwordOk,
    passwordError,
    confirmOk,
    confirmError
  };
};