import React from 'react';
import { connect } from 'react-redux';
import { setWinner } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class AdminSetWinnerPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    if (this.props.value) {
      this.props.handleSubmit(this.props.id, this.props.value);
    }
  }
  render() {
    return (
      <div className={'set-winner-popup ' + (this.props.hidden ? 'set-winner-popup--hidden' : '')}>
        <div className="set-winner-popup__layout" onClick={this.props.triggerPopup}></div>
        <div className="set-winner-popup__form">
          <div className="set-winner-popup__title">Set match winner</div>
          <div className="set-winner-popup__input-row">
            <div className="set-winner-popup__input-box">
              <input
                type="checkbox"
                className="set-winner-popup__input"
                name="A"
                checked={this.props.value == 'A'}
                onChange={this.props.handleCheckbox}
              />
              <label className="set-winner-popup__label">{this.props.nameA}</label>
            </div>
            <div className="set-winner-popup__input-box set-winner-popup__input-box--B">
              <input
                type="checkbox"
                className="set-winner-popup__input"
                name="B"
                checked={this.props.value == 'B'}
                onChange={this.props.handleCheckbox}
              />
              <label className="set-winner-popup__label">{this.props.nameB}</label>
            </div>
          </div>
          <div className="set-winner-popup__submit-box">
            <div className="set-winner-popup__submit" onClick={this.handleSubmit}>Submit</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const popup = state.popups.setWinnerPopup;
  return {
    id: popup.id,
    nameA: popup.nameA,
    nameB: popup.nameB,
    value: popup.value,
    hidden: popup.hidden
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCheckbox: (e) => {
      dispatch({
        type: 'WINNER_POPUP_HANDLE_CHECKBOX',
        value: e.target.name
      })
    },
    handleSubmit: (id, winner) => {
      setWinner(id, winner, dispatch);
    },
    triggerPopup: () => {
      dispatch({
        type: 'WINNER_POPUP_CLOSE'
      })
    }
  }
};

AdminSetWinnerPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminSetWinnerPopup);

export default AdminSetWinnerPopup;