import React from 'react';
import { connect } from 'react-redux';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class AdminMatchesPopup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'admin-matches-popup ' + (this.props.hidden ? 'admin-matches-popup--hidden' : '')}>
        <div className="admin-matches-popup__layout" onClick={this.props.triggerMatchPopup}></div>
        <form className="admin-matches-popup__form">
          <div className="admin-matches-popup__input-row">
            <div className="admin-matches-popup__input-box">
              <div className="admin-matches-popup__label">Name A</div>
              <input
                type="text"
                className="admin-matches-popup__input"
                name="nameA"
                value={this.props.nameA}
                onChange={this.props.handleInput}
              />
            </div>
            <div className="admin-matches-popup__input-box  admin-matches-popup__input-box--right">
              <div className="admin-matches-popup__label">Name B</div>
              <input
                type="text"
                className="admin-matches-popup__input"
                name="nameB"
                value={this.props.nameB}
                onChange={this.props.handleInput}
              />
            </div>
          </div>
          <div className="admin-matches-popup__input-row">
            <div className="admin-matches-popup__input-box">
              <div className="admin-matches-popup__label">Coefficient A</div>
              <input
                type="text"
                className="admin-matches-popup__input"
                name="coeffA"
                value={this.props.coeffA}
                onChange={this.props.handleInput}
              />
            </div>
            <div className="admin-matches-popup__input-box admin-matches-popup__input-box--right">
              <div className="admin-matches-popup__label">Coefficient B</div>
              <input
                type="text"
                className="admin-matches-popup__input"
                name="coeffB"
                value={this.props.coeffB}
                onChange={this.props.handleInput}
              />
            </div>
          </div>
          <div className="admin-matches-popup__input-row admin-matches-popup__input-row--center">
            <div className="admin-matches-popup__input-box">
              <div className="admin-matches-popup__label">Date</div>
              <input
                type="text"
                className="admin-matches-popup__input"
                placeholder="mask: 22-03-2017"
                name="date"
                value={this.props.date}
                onChange={this.props.handleInput}
              />
            </div>
          </div>
          <div className="admin-matches-popup__input-row admin-matches-popup__input-row--center">
            <div className="admin-matches-popup__input-box">
              <div className="admin-matches-popup__label">Time</div>
              <input
                type="text"
                className="admin-matches-popup__input"
                placeholder="mask: 17:00"
                name="time"
                value={this.props.time}
                onChange={this.props.handleInput}
              />
            </div>
          </div>
          <div className="admin-matches-popup__input-row admin-matches-popup__input-row--submit">
            <div
              className="admin-matches-popup__submit"
              onClick={() => {
                if (this.props.isUpdate) {
                  this.props.handleSubmitUpdate();
                } else {
                  this.props.handleSubmit();
                }
              }}
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
  const popup = state.popups.adminMatchesPopup;
  return {
    hidden: popup.hidden,
    nameA: popup.nameA,
    coeffA: popup.coeffA,
    nameB: popup.nameB,
    coeffB: popup.coeffB,
    date: popup.date,
    time: popup.time,
    id: popup.id,
    isUpdate: popup.isUpdate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInput: (e) => {
      dispatch({
        type: 'ADMIN_HANDLE_MATCHES_POPUP_INPUT',
        value: e.target.value,
        name: e.target.name
      })
    },
    triggerMatchPopup: () => {
      dispatch({
        type: 'ADMIN_TRIGGER_MATCH_POPUP'
      })
    },
    handleSubmit: () => {
      dispatch({
        type: 'ADMIN_SUBMIT_MATCHES_POPUP',
        dispatch
      })
    },
    handleSubmitUpdate: () => {
      dispatch({
        type: 'ADMIN_SUBMIT_UPDATE_MATCHES_POPUP',
        dispatch
      })
    }
  }
};

AdminMatchesPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminMatchesPopup);

export default AdminMatchesPopup;