import React from 'react';
import { connect } from 'react-redux';
import { makeBet } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class MakeBetPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      creditsInputError: false
    };
  }
  handleSubmit() {
    if (!this.props.creditsInput.match(/^\d+(\.\d{1,2})?$/) || (this.props.creditsInput > this.props.userCredits)) {
      this.setState({
        creditsInputError: true
      });
    } else {
      this.setState({
        creditsInputError: false
      });
      this.props.handleSubmit(
        this.props.id,
        this.props.login,
        this.props.bet,
        this.props.creditsInput,
        this.props.winCredits
      );
    }
  }
  render() {
    return (
      <div className={'make-bet-popup ' + (this.props.hidden ? 'make-bet-popup--hidden' : '')}>
        <div className="make-bet-popup__layout" onClick={this.props.triggerPopup}></div>
        <form className="make-bet-popup__form">
          <div className="make-bet-popup__title">Make bet on: {this.props.name}</div>
          <div className="make-bet-popup__coeff">With coefficient {this.props.coeff}</div>
          <div className="make-bet-popup__date-time">{this.props.date}|{this.props.time}</div>
          <div className="make-bet-popup__input-row">
            <div className="make-bet-popup__label">Enter credits</div>
            <input
              type="text"
              className={'make-bet-popup__input ' + (this.state.creditsInputError ? 'input-error' : '')}
              name="creditsInput"
              value={this.props.creditsInput}
              onChange={this.props.handleCreditsInput}
            />
          </div>
          <div className="make-bet-popup__win-case">If you win, you will get <strong>{this.props.winCredits}</strong> credits</div>
          <div className="make-bet-popup__input-row make-bet-popup__input-row--submit">
            <div className="make-bet-popup__submit" onClick={this.handleSubmit}>Submit</div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let popup = state.popups.makeBetPopup;
  return {
    name: popup.name,
    coeff: popup.coeff,
    date: popup.date,
    time: popup.time,
    winCredits: popup.winCredits,
    bet: popup.bet,
    creditsInput: popup.creditsInput,
    id: popup.id,
    login: state.account.login,
    userCredits: state.account.credits,
    hidden: popup.hidden
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreditsInput: (e) => {
      if (e.target.value.match(/^[\d\.]+$/)) {
        dispatch({
          type: 'MAKE_BET_POPUP_HANDLE_INPUT',
          name: e.target.name,
          value: e.target.value
        })
      }
    },
    handleSubmit: (id, login, betSide, credits, winCredits) => {
      makeBet(id, login, betSide, credits, winCredits, dispatch);
    },
    triggerPopup: () => {
      dispatch({
        type: 'MAKE_BET_POPUP_TRIGGER'
      })
    }
  }
};

MakeBetPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeBetPopup);

export default MakeBetPopup;