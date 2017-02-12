export const submitRegistrationForm = (login, password, dispatch) => {
  let data = {
    login,
    password
  };
  fetch('/submitRegistrationForm', {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == 'error') {
        dispatch({
          type: 'REGISTRATION_FORM_USER_EXISTS'
        })
      } else {
        dispatch({
          type: 'REGISTRATION_FORM_SUCCESSFUL'
        });
        dispatch({
          type: 'SET_ACCOUNT_LOGIN',
          login
        });
      }
    });
};

export const submitLoginForm = (login, password, dispatch) => {
  let data = {
    login,
    password
  };
  fetch('/submitLoginForm', {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == 'error') {
        dispatch({
          type: 'LOGIN_ERROR'
        })
      } else {
        dispatch({
          type: 'LOGIN_SUCCESS'
        });
        dispatch({
          type: 'SET_USER_INFO',
          data: data.user
        })
      }
    });
};

export const getUserInfo = (login, dispatch) => {
  fetch(`/getUserInfo/${login}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: 'SET_USER_INFO',
        data: data.user
      });
    });
};

export const getMatchItems = (dispatch) => {
  fetch('/getMatchItems')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: 'SET_MATCH_ITEMS',
        data: data.items
      });
    });
};