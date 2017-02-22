import React from 'react';
import { connect } from 'react-redux';
import { addCreditsToAccount } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class HeaderCreditsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditInputError: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    if (this.props.creditInput.match(/^\d+(\.\d{1,2})?$/)) {
      this.setState({
        creditInputError: false
      });
      this.props.handleSubmit(this.props.creditInput, this.props.accountLogin);
    } else {
      this.setState({
        creditInputError: true
      });
    }
  }
  render() {
    return (
      <div
        className={'header-credits-popup ' + (this.props.hidden ? 'header-credits-popup--hidden' : '')}
      >
        <div className="header-credits-popup__layout" onClick={this.props.triggerCreditsPopup}></div>
        <form className="header-credits-popup__form">
          <div className="header-credits-popup__title">Your credits: {this.props.credits.toFixed(2)}</div>
          <div className="header-credits-popup__input-row">
            <div className="header-credits-popup__label">Enter credits amount you will receive</div>
            <input
              type="text"
              className={'header-credits-popup__input ' + (this.state.creditInputError ? 'input-error' : '')}
              name="creditInput"
              value={this.props.creditInput}
              onChange={this.props.handleInput}
            />
          </div>
          <div className="header-credits-popup__input-row header-credits-popup__input-row--submit">
            <div
              className="header-credits-popup__submit"
              onClick={this.handleSubmit}
            >
              Submit
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hidden: state.popups.headerCreditsPopup.hidden,
    credits: state.account.credits,
    creditInput: state.popups.headerCreditsPopup.creditInput,
    accountLogin: state.account.login
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInput: (e) => {
      if (e.target.name == 'creditInput') {
        if (e.target.value.match(/^[\d\.]+$/)) {
          dispatch({
            type: 'HEADER_POPUP_HANDLE_INPUT',
            name: e.target.name,
            value: e.target.value
          })
        }
      }
    },
    handleSubmit: (credits, login) => {
      addCreditsToAccount(credits, login, dispatch);
    }
  }
};

HeaderCreditsPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderCreditsPopup);

export default HeaderCreditsPopup;