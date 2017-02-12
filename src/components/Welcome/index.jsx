import React from 'react';
import { Link, browserHistory } from 'react-router';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="welcome main-box">
        <div className="welcome__title">Welcome to my app</div>
        <div className="welcome__button-box">
          <Link to="/registration" className="welcome__button">Sign up</Link>
        </div>
      </div>
    )
  }
}

export default Welcome;