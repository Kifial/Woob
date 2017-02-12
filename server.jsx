const express = require('express');
const port = 8080;
const fs = require('fs');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const uuid = require('uuid');
import { match } from 'react-router';
import { RouterContext } from 'react-router';
import routes from './src/routes/index.jsx';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { app as reducer } from './src/reducers';

const app = express();
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(webpackMiddleware(webpack(webpackConfig), {
    noInfo: false,
    quiet: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    publicPath: '/dist/',
    index: 'index.html',
    serverSideRender: false
  }
));

app.post('/submitRegistrationForm', (req, res) => {
  let json = fs.readFileSync('data.json', 'utf-8');
  let data = JSON.parse(json);
  let status = true;
  let response = {
    message: ''
  };
  data.users.forEach((item) => {
    if (item.login == req.body.login) {
      status = false;
      return 0;
    }
  });
  if (status) {
    data.users.push({
      login: req.body.login,
      password: req.body.password,
      credits: '0.00'
    });
    fs.writeFileSync('data.json', JSON.stringify(data, "", 2));
    response.message = 'ok';
  } else {
    response.message = 'error';
  }
  res.send(JSON.stringify(response));
});

app.post('/submitLoginForm', (req, res) => {
  let json = fs.readFileSync('data.json', 'utf-8');
  let data = JSON.parse(json);
  let status = false;
  let response = {
    message: '',
    user: {}
  };
  data.users.forEach((item) => {
    if (item.login == req.body.login && item.password == req.body.password) {
      status = true;
      response.user = {
        login: item.login,
        credits: item.credits
      };
      return 0;
    }
  });
  if (status) {
    response.message = 'ok';
  } else {
    response.message = 'error';
  }
  res.send(JSON.stringify(response));
});

app.get('/getUserInfo/:login', (req, res) => {
  let json = fs.readFileSync('data.json', 'utf-8');
  let data = JSON.parse(json);
  let response = {
    message: '',
    user: {}
  };
  data.users.forEach((item) => {
    if (item.login == req.params.login) {
      response.user = {
        login: item.login,
        credits: item.credits
      };
      return 0;
    }
  });
  res.send(JSON.stringify(response));
});

app.get('/getMatchItems', (req, res) => {
  let json = fs.readFileSync('data.json', 'utf-8');
  let data = JSON.parse(json);
  let response = {
    items: data.matches
  };
  res.send(JSON.stringify(response));
});

app.get('*', (req, res) => {
  // let data = {};
  //
  // const store = createStore(reducer, data);
  // const preloadedState = store.getState();
  //
  // console.log(preloadedState);
  //
  // match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
  //   if (error) {
  //     res.status(500).send(error.message);
  //   } else if (redirectLocation) {
  //     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //   } else if (renderProps) {
  //     const html = ReactDOMServer.renderToString(
  //       <Provider store={store}>
  //         <RouterContext { ...renderProps } />
  //       </Provider>
  //     );
  //     res.send(renderFullPage(html, preloadedState));
  //   }
  // });

  res.sendFile(path.resolve(__dirname, '', 'index.html'));
});

const server = app.listen(port, () => {
  console.log('Listening on port:' + port);
});

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
      <link rel="stylesheet" href="/dist/app.css">
    </head>
    <body>
      <div id="wrapper">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="/dist/build.js"></script>
     </body>
    </html>
  `;
}
