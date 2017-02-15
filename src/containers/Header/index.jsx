import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getUserInfo } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
    this.handleUserLogOut = this.handleUserLogOut.bind(this);
  }
  componentWillMount() {
    let data = '';
    if (localStorage.getItem('account')) {
      this.setState({
        logged: true
      });
      data = JSON.parse(localStorage.getItem('account'));
      this.props.getUserInfo(data.login);
    }
  }
  handleUserLogOut() {
    this.props.handleUserLogOut();
    this.setState({
      logged: false
    });
  }
  render() {
    let notLogged = () =>
      <nav className="header__nav">
        <Link to="/registration" className="header__button header__button--registration">Sign up</Link>
        <Link to="/login" className="header__button header__button--login">Sign in</Link>
      </nav>;
    let logged = () =>
      <nav className="header__nav header__nav--logged">
        <div className="header__credits-box">
          <div className="header__credits">
            Credits: {this.props.credits}
          </div>
          <div className="header__credits-button">

          </div>
        </div>
        <div className="header__user-box">
          <div className="header__user-name" onClick={this.props.triggerUserPopup}>
            {this.props.login}
          </div>
          <div
            className={'header__user-popup ' + (this.props.userPopupHidden ? '' : 'header__user-popup--active')}
            onClick={this.props.triggerUserPopup}
          >
            {this.props.admin ?
              <Link to="/admin" className="header__user-popup-item">Admin</Link> : ''
            }
            <div className="header__user-popup-item" onClick={this.handleUserLogOut}>Log out</div>
          </div>
          <div
            className={'header__user-popup-layout ' +
            (this.props.userPopupHidden ? '' : 'header__user-popup-layout--active')}
            onClick={this.props.triggerUserPopup}>
          </div>
        </div>
      </nav>;
    return (
      <header className="header">
        <div className="header__wrapper">
          <div className="header__logo"><Link to="/">Woob</Link></div>
          {this.state.logged || this.props.login ? logged() : notLogged()}
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.account.login,
    credits: state.account.credits,
    userPopupHidden: state.popups.headerPopups.userPopupHidden,
    admin: state.account.admin
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (login) => {
      getUserInfo(login, dispatch);
    },
    triggerUserPopup: () => {
      dispatch({
        type: 'TRIGGER_USER_POPUP'
      })
    },
    handleUserLogOut: () => {
      dispatch({
        type: 'HANDLE_USER_LOG_OUT'
      });
    }
  }
};

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default Header;