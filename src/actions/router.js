export const checkAuth = (nextState, replace) => {
  let data = '';
  if (localStorage.getItem('account')) {
    data = JSON.parse(localStorage.getItem('account'));
  }
  if (!data && !data.login) {
    replace('/welcome');
  }
};