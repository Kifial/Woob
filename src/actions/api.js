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
          data: data.user,
          admin: data.admin
        });
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
        data: data.user,
        admin: data.admin
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

export const getAdminMatches = (dispatch) => {
  fetch('/getAdminMatches')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: 'ADMIN_SET_MATCHES',
        data: data.items
      })
    });
};

export const submitAdminPopup = (data, dispatch) => {
  fetch('/addMatch', {
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
      if (data.message == 'ok') {
        delete data.message;
        dispatch({
          type: 'ADMIN_MATCH_ADDED',
          data
        })
      } else {
        dispatch({
          type: 'ADMIN_MATCH_NOT_ADDED'
        })
      }
    })
};

export const submitUpdateAdminPopup = (data, dispatch) => {
  fetch('/updateMatch', {
    method: 'put',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .then((server) => {
      if (server.message == 'ok') {
        dispatch({
          type: 'ADMIN_MATCH_UPDATED',
          data
        })
      } else {
        dispatch({
          type: 'ADMIN_MATCH_NOT_UPDATED'
        })
      }
    });
};

export const deleteMatch = (id, dispatch) => {
  fetch(`/deleteMatch/${id}`, {
    method: 'delete'
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == 'ok') {
        dispatch({
          type: 'ADMIN_DELETE_MATCH',
          id
        })
      } else {
        dispatch({
          type: 'ADMIN_MATCH_NOT_DELETED'
        })
      }
    })
};