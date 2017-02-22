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

export const addCreditsToAccount = (credits, login, dispatch) => {
  fetch('/addCreditsToAccount', {
    method: 'post',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ credits, login })
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == 'ok') {
        dispatch({
          type: 'ACCOUNT_ADD_CREDITS',
          credits: data.credits
        });
        dispatch({
          type: 'CREDITS_POPUP_SUCCESS'
        });
      }
    })
};

export const getMatchesByFilter = (filter, dispatch) => {
  fetch(`/getMatches/${filter}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.message == 'ok') {
        dispatch({
          type: 'SET_HOME_FILTER',
          filter
        });
        dispatch({
          type: 'SET_MATCH_ITEMS',
          items: data.items
        });
      }
    })
};

export const getMatchesByUser = (login, dispatch) => {
  fetch(`/getUserMatches/${login}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == 'ok') {
        dispatch({
          type: 'SET_HOME_FILTER',
          filter: 'user'
        });
        dispatch({
          type: 'SET_MATCH_ITEMS',
          items: data.items
        });
      }
    })
};

export const makeBet = (id, login, betSide, credits, winCredits, dispatch) => {
  let data = {
    id,
    login,
    betSide,
    credits,
    winCredits
  };
  fetch('makeBet', {
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
        dispatch({
          type: 'BET_CREATED',
          credits: data.credits
        })
      }
    })
};

export const getUserBets = (login, dispatch) => {
  fetch(`/getUserBets/${login}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == 'ok') {
        dispatch({
          type: 'SET_BETS_ITEMS',
          items: data.items
        })
      }
    });
};

export const setWinner = (id, winner, dispatch) => {
  let args = {
    id,
    winner
  };
  fetch('/setWinner', {
    method: 'put',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(args)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == 'ok') {
        dispatch({
          type: 'WINNER_POPUP_CLOSE'
        });
        dispatch({
          type: 'ADMIN_SET_WINNER',
          id: data.id,
          winner: data.winner
        });
      }
    })
};

export const submitBet = (id, status, credits, dispatch) => {
  let args = {
    id,
    status,
    credits
  };
  fetch('/submitBet', {
    method: 'put',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(args)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == 'ok') {
        dispatch({
          type: 'BET_SUBMITTED',
          id: data.id,
          credits: data.credits
        })
      }
    })
};

export const getBets = (dispatch) => {
  fetch('/getBets')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message = 'ok') {
        dispatch({
          type: 'SET_ADMIN_BETS',
          items: data.items
        })
      }
    })
};