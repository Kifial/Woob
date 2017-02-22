import React from 'react';
import MatchItem from '../../components/MatchItem/index.jsx';
import { connect } from 'react-redux';
import { getMatchesByFilter } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class MatchList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getMatchItems();
  }
  render() {
    return (
      <div className="match-list">
        {this.props.items.map((item) =>
          <MatchItem
            key={item._id}
            id={item._id}
            A={item.A}
            B={item.B}
            date={item.date}
            time={item.time}
            handleBet={this.props.handleBet}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.home.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMatchItems: () => {
      getMatchesByFilter('all', dispatch);
    },
    handleBet: (id, name, coeff, date, time, bet) => {
      dispatch({
        type: 'MAKE_BET_POPUP_SET_INFO',
        id,
        name,
        coeff,
        date,
        time,
        bet
      })
    }
  }
};

MatchList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList);

export default MatchList;