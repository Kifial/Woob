const express = require('express');
const port = 8080;
const fs = require('fs');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackConfig = require('./webpack.config');
const uuid = require('uuid');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoUrl = 'mongodb://localhost:27017/woob';
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
  let response = {
    message: ''
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.body.login
    }, (err, result) => {
      if (!result) {
        db.collection('users').insertOne({
          'login': req.body.login,
          'password': req.body.password,
          'credits': '0.00'
        }, (err, result) => {
          response.message = 'ok';
        });
      } else {
        response.message = 'error';
      }
      db.close();
      res.send(JSON.stringify(response));
    });
  });
});

app.post('/submitLoginForm', (req, res) => {
  let response = {
    message: '',
    user: {},
    admin: false
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.body.login,
      'password': req.body.password
    }, (err, result) => {
      if (result) {
        response.message = 'ok';
        response.user = {
          login: result.login,
          credits: result.credits
        };
        if (result.admin) {
          response.admin = true;
        }
      } else {
        response.message = 'error';
      }
      db.close();
      res.send(JSON.stringify(response));
    });
  });
});

app.get('/getUserInfo/:login', (req, res) => {
  let response = {
    message: '',
    user: {},
    admin: false
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.params.login
    }, (err, result) => {
      if (result) {
        response.message = 'ok';
        response.user = {
          login: result.login,
          credits: result.credits
        };
        if (result.admin) {
          response.admin = true;
        }
      } else {
        response.message = 'error';
      }
      db.close();
      res.send(JSON.stringify(response));
    });
  });
});

app.get('/getMatchItems', (req, res) => {
  let response = {
    items: []
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    const cursor = db.collection('matches').find();
    cursor.each((err, item) => {
      if (item != null) {
        response.items.push(item);
      } else {
        db.close();
        res.send(JSON.stringify(response));
      }
    });
  });
});

app.get('/checkAdminAuth/:login', (req, res) => {
  let response = {
    message: ''
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('users').findOne({
      'login': req.params.login
    }, (err, result) => {
      if (result && result.admin) {
        response.message = 'ok';
      } else {
        response.message = 'error';
      }
      db.close();
      res.send(JSON.stringify(response));
    });
  });
});

app.get('/getAdminMatches', (req, res) => {
  let response = {
    items: []
  };
  MongoClient.connect(mongoUrl, (err, db) => {
    const cursor = db.collection('matches').find();
    cursor.each((err, item) => {
      if (item != null) {
        response.items.push(item);
      } else {
        db.close();
        res.send(JSON.stringify(response));
      }
    })
  })
});

app.post('/addMatch', (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('matches').insertOne({
      'A': {
        'name': req.body.nameA,
        'coeff': req.body.coeffA
      },
      'B': {
        'name': req.body.nameB,
        'coeff': req.body.coeffB
      },
      'date': req.body.date,
      'time': req.body.time
    }, (err, result) => {
      let data = Object.assign({}, result.ops[0], { message: 'ok' });
      db.close();
      res.send(JSON.stringify(data));
    });
  })
});

app.put('/updateMatch', (req, res) => {
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('matches').updateOne({
      '_id': ObjectId(req.body.id)
    }, {
      $set: {
        'A': {
          'name': req.body.nameA,
          'coeff': req.body.coeffA
        },
        'B': {
          'name': req.body.nameB,
          'coeff': req.body.coeffB
        },
        'date': req.body.date,
        'time': req.body.time
      }
    }, (err, result) => {
      let response = {
        message: 'ok'
      };
      db.close();
      res.send(JSON.stringify(response));
    });
  })
});

app.delete('/deleteMatch/:id', (req, res) => {
  console.log(req.params);
  MongoClient.connect(mongoUrl, (err, db) => {
    db.collection('matches').deleteOne({
      '_id': ObjectId(req.params.id)
    }, (err, result) => {
      let response = {
        message: ''
      };
      response.message = 'ok';
      db.close();
      res.send(JSON.stringify(response));
    });
  });
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
