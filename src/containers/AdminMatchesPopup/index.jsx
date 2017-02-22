import React from 'react';
import { connect } from 'react-redux';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class AdminMatchesPopup extends React.Component {
  constructor(props) {
    super(props);
    this.validateForm = this.validateForm.bind(this);
    this.state = {
      nameAError: false,
      nameBError: false,
      coeffAError: false,
      coeffBError: false,
      dateError: false,
      timeError: false
    }
  }
  validateForm() {
    let errors = false;
    this.setState({
      nameAError: false,
      nameBError: false,
      coeffAError: false,
      coeffBError: false,
      dateError: false,
      timeError: false
    });
    if (this.props.nameA.length < 2 || this.props.nameA.length > 32) {
      this.setState({
        nameAError: true
      });
      errors = true;
    }
    if (this.props.nameB.length < 2 || this.props.nameB.length > 32) {
      this.setState({
        nameBError: true
      });
      errors = true;
    }
    let coeffRegExp = new RegExp('^[0-9]{1,2}\.[0-9]{3}$');
    if (!this.props.coeffA.match(coeffRegExp)) {
      this.setState({
        coeffAError: true
      });
      errors = true;
    }
    if (!this.props.coeffB.match(coeffRegExp)) {
      this.setState({
        coeffBError: true
      });
      errors = true;
    }
    if (!this.props.date.match(/^[0-3][0-9]-[0-1][0-9]-[0-9]{4}$/)) {
      this.setState({
        dateError: true
      });
      errors = true;
    }
    if (!this.props.time.match(/^[0-2][0-9]:[0-5][0-9]$/)) {
      this.setState({
        timeError: true
      });
      errors = true;
    }
    if (!errors) {
      if (this.props.isUpdate) {
        this.props.handleSubmitUpdate();
      } else {
        this.props.handleSubmit();
      }
    }
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
                className={'admin-matches-popup__input ' + (this.state.nameAError ? 'input-error' : '')}
                name="nameA"
                value={this.props.nameA}
                onChange={this.props.handleInput}
              />
            </div>
            <div className="admin-matches-popup__input-box  admin-matches-popup__input-box--right">
              <div className="admin-matches-popup__label">Name B</div>
              <input
                type="text"
                className={'admin-matches-popup__input ' + (this.state.nameBError ? 'input-error' : '')}
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
                className={'admin-matches-popup__input ' + (this.state.coeffAError ? 'input-error' : '')}
                name="coeffA"
                value={this.props.coeffA}
                onChange={this.props.handleInput}
              />
            </div>
            <div className="admin-matches-popup__input-box admin-matches-popup__input-box--right">
              <div className="admin-matches-popup__label">Coefficient B</div>
              <input
                type="text"
                className={'admin-matches-popup__input ' + (this.state.coeffBError ? 'input-error' : '')}
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
                className={'admin-matches-popup__input ' + (this.state.dateError ? 'input-error' : '')}
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
                className={'admin-matches-popup__input ' + (this.state.timeError ? 'input-error' : '')}
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
              onClick={this.validateForm}
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