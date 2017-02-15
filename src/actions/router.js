export const checkAuth = (nextState, replace) => {
  let data = '';
  if (localStorage.getItem('account')) {
    data = JSON.parse(localStorage.getItem('account'));
  }
  if (!data && !data.login) {
    replace('/welcome');
  }
};

export const checkAdminAuth = (nextState, replace, callback) => {
  let data = '';
  if (localStorage.getItem('account')) {
    data = JSON.parse(localStorage.getItem('account'));
    fetch(`/checkAdminAuth/${data.login}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message == 'error') {
          replace('/home');
        }
        callback();
      })
  } else {
    replace('/welcome');
    callback();
  }
};