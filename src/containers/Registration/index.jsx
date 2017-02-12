import React from 'react';
import { connect } from 'react-redux';
import { submitRegistrationForm } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationTimeout: ''
    };
    this.handleValidation = this.handleValidation.bind(this);
  }
  handleValidation() {
    if (this.state.validationTimeout) {
      clearTimeout(this.state.validationTimeout);
    }
    let validationTimeout = setTimeout(this.props.handleValidation, 500);
    this.setState({
      validationTimeout
    });
  }
  render() {
    let loginMessageClass = 'registration__input-message';
    if (this.props.loginError) loginMessageClass += ' message-error';
    if (this.props.loginOk) loginMessageClass += ' message-ok';
    let loginInputClass = 'registration__input';
    if (this.props.loginError) loginInputClass += ' input-error';
    if (this.props.loginOk) loginInputClass += ' input-ok';
    let passwordMessageClass = 'registration__input-message';
    if (this.props.passwordError) passwordMessageClass += ' message-error';
    if (this.props.passwordOk) passwordMessageClass += ' message-ok';
    let passwordInputClass = 'registration__input';
    if (this.props.passwordError) passwordInputClass += ' input-error';
    if (this.props.passwordOk) passwordInputClass += ' input-ok';
    let confirmMessageClass = 'registration__input-message';
    if (this.props.confirmError) confirmMessageClass += ' message-error';
    if (this.props.confirmOk) confirmMessageClass += ' message-ok';
    let confirmInputClass = 'registration__input';
    if (this.props.confirmError) confirmInputClass += ' input-error';
    if (this.props.confirmOk) confirmInputClass += ' input-ok';
    return (
      <div className="registration main-box">
        <div className="registration__wrapper">
          <div className="registration__title">Registration form</div>
          <form className="registration__form" autoComplete="off">
            <div className="registration__input-box">
              <label htmlFor="login" className="registration__label">Login</label>
              <input
                type="text"
                name="login"
                className={loginInputClass}
                value={this.props.login}
                onChange={(e) => {
                  this.props.handleChange(e);
                  this.handleValidation();
                }}
              />
              <div className={loginMessageClass}>
                {this.props.loginError}
                {this.props.loginOk}
              </div>
            </div>
            <div className="registration__input-box">
              <label htmlFor="password" className="registration__label">Password</label>
              <input
                type="password"
                name="password"
                className={passwordInputClass}
                value={this.props.password}
                onChange={(e) => {
                  this.props.handleChange(e);
                  this.handleValidation();
                }}
              />
              <div className={passwordMessageClass}>
                {this.props.passwordError}
                {this.props.passwordOk}
              </div>
            </div>
            <div className="registration__input-box">
              <label htmlFor="confirm" className="registration__label">Confirm password</label>
              <input
                type="password"
                name="confirm"
                className={confirmInputClass}
                value={this.props.confirm}
                onChange={(e) => {
                  this.props.handleChange(e);
                  this.handleValidation();
                }}
              />
              <div className={confirmMessageClass}>
                {this.props.confirmError}
                {this.props.confirmOk}
              </div>
            </div>
            <div className="registration__submit-box">
              <div
                className="registration__submit"
                onClick={() => this.props.handleSubmit(
                  this.props.login,
                  this.props.password,
                  this.props.confirm,
                  this.props.loginOk,
                  this.props.passwordOk,
                  this.props.confirmOk
                )}
              >
                Submit
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const form = state.forms.registration;
  return {
    login: form.login,
    password: form.password,
    confirm: form.confirm,
    loginError: form.loginError,
    loginOk: form.loginOk,
    passwordError: form.passwordError,
    passwordOk: form.passwordOk,
    confirmError: form.confirmError,
    confirmOk: form.confirmOk
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => {
      dispatch({
        type: 'HANDLE_REGISTRATION_FORM_CHANGE',
        value: e.target.value,
        name: e.target.name
      })
    },
    handleValidation: () => {
      dispatch({
        type: 'VALIDATE_REGISTRATION_INPUT'
      })
    },
    handleSubmit: (login, password, loginOk, passwordOk, confirmOk) => {
      if (loginOk && passwordOk && confirmOk && password == confirm) {
        submitRegistrationForm(login, password, dispatch);
      } else {
        dispatch({
          type: 'HANDLE_REGISTRATION_FORM_SUBMIT_ERRORS',
          login: loginOk ? '' : 'error',
          password: passwordOk ? '' : 'error',
          confirm: confirmOk ? '' : 'error'
        });
      }
    }
  }
};

Registration = connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);

export default Registration;