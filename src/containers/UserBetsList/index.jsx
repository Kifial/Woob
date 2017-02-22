import React from 'react';
import { connect } from 'react-redux';
import UserBetsPopup from '../../components/UserBetsPopup/index.jsx';
import UserBetsItem from '../../components/UserBetsItem/index.jsx';
import { getUserBets, submitBet } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class UserBetsList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let lS = localStorage.getItem('account');
    let login = JSON.parse(lS).login;
    this.props.getUserBets(login);
  }
  render() {
    return (
      <div className="user-bets-list">
        <div className="user-bets-list__list">
          {this.props.items.map((item) =>
            <UserBetsItem
              key={item.id}
              id={item.id}
              match={item.match}
              credits={item.credits}
              betSide={item.betSide}
              A={item.A}
              B={item.B}
              date={item.date}
              time={item.time}
              status={item.status}
              handleSubmit={() => this.props.handleSubmitItem(item.id, item.status, item.credits)}
            />
          )}
        </div>
        <UserBetsPopup />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.bets.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserBets: (login) => {
      getUserBets(login, dispatch);
    },
    handleSubmitItem: (id, status, credits) => {
      submitBet(id, status, credits, dispatch);
    }
  }
};

UserBetsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBetsList);

export default UserBetsList;