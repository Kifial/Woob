import React from 'react';
import MatchItem from '../../components/MatchItem/index.jsx';
import { connect } from 'react-redux';
import { getMatchItems } from '../../actions/api';

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
      getMatchItems(dispatch);
    }
  }
};

MatchList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList);

export default MatchList;