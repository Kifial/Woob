import React from 'react';
import { connect } from 'react-redux';
import { submitLoginForm } from '../../actions/api';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let loginMessageClass = 'registration__input-message';
    if (this.props.loginError) loginMessageClass += ' message-error';
    let loginInputClass = 'registration__input';
    if (this.props.loginError) loginInputClass += ' input-error';
    let passwordMessageClass = 'registration__input-message';
    if (this.props.passwordError) passwordMessageClass += ' message-error';
    let passwordInputClass = 'registration__input';
    if (this.props.passwordError) passwordInputClass += ' input-error';
    return (
      <div className="registration main-box">
        <div className="registration__wrapper">
          <div className="registration__title">Login form</div>
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
                }}
              />
              <div className={passwordMessageClass}>
                {this.props.passwordError}
                {this.props.passwordOk}
              </div>
            </div>
            <div className="registration__submit-box">
              <div
                className="registration__submit"
                onClick={() => this.props.handleSubmit(this.props.login, this.props.password)}
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
  const form = state.forms.login;
  return {
    login: form.login,
    password: form.password,
    loginError: form.loginError,
    passwordError: form.passwordError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (e) => {
      dispatch({
        type: 'HANDLE_LOGIN_FORM_CHANGE',
        value: e.target.value,
        name: e.target.name
      })
    },
    handleSubmit: (login, password) => {
      submitLoginForm(login, password, dispatch);
    }
  }
};

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;