import React from 'react';
import UserBetsControls from '../UserBetsControls/index.jsx';
import UserBetsList from '../UserBetsList/index.jsx';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class UserBets extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="user-bets">
        <UserBetsControls />
        <UserBetsList />
      </div>
    )
  }
}

export default UserBets;