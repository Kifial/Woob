import React from 'react';
import { connect } from 'react-redux';
import { getMatchesByFilter } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class HomeControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home-controls">
        <div className="home-controls__buttons-box">
          <div
            className={'home-controls__button ' + (this.props.filter == 'all' ? 'home-controls__button--active' : '')}
            onClick={() => this.props.handleFilter('all')}
          >
            All
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.home.filter,
    login: state.account.login
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFilter: (filter) => {
      getMatchesByFilter(filter, dispatch);
    }
  }
};

HomeControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeControls);

export default HomeControls;