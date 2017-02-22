import React from 'react';
import { connect } from 'react-redux';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class UserBetsControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="user-bets-controls">

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

UserBetsControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBetsControls);

export default UserBetsControls;