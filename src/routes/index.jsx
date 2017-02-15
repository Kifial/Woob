import React from 'react';
import { IndexRoute, Route, IndexRedirect } from 'react-router';
import App from '../containers/App/index.jsx';
import Welcome from '../components/Welcome/index.jsx';
import Registration from '../containers/Registration/index.jsx';
import Login from '../containers/Login/index.jsx';
import Home from '../containers/Home/index.jsx';
import Admin from '../containers/Admin/index.jsx';
import AdminMatches from '../containers/AdminMatches/index.jsx';
import { checkAuth, checkAdminAuth } from '../actions/router';

const routes = (
  <Route path="/" component={App}>
    <Route onEnter={checkAuth}>
      <Route path="home" component={Home} />
    </Route>
    <Route onEnter={checkAdminAuth}>
      <Route path="admin" component={Admin}>
        <IndexRedirect to="matches" />
        <Route path="matches" component={AdminMatches} />
      </Route>
    </Route>
    <IndexRedirect to="/home" />
    <Route path="welcome" component={Welcome} />
    <Route path="registration" component={Registration} />
    <Route path="login" component={Login} />
  </Route>
);

export default routes;