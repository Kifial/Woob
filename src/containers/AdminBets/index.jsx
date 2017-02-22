import React from 'react';
import { connect } from 'react-redux';
import { getBets } from '../../actions/api';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class AdminBets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTimeout: ''
    };
  }
  componentDidMount() {
    this.props.getBets();
  }
  render() {
    return (
      <div className="admin-matches">
        <div className="admin-matches__controls">
          <div className="admin-matches__search">
            <input
              type="text"
              name="search"
              placeholder="search"
              className="admin-matches__search-input"
              value={this.props.search}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="admin-bets__table">
          <div className="admin-bets__table-header">
            <div className="admin-bets__table-header-item admin-bets__table-item--user">
              User
            </div>
            <div className="admin-bets__table-header-item admin-bets__table-item--match">
              Match
            </div>
            <div className="admin-bets__table-header-item admin-bets__table-item--income">
              Income
            </div>
          </div>
          {this.props.items.map((item) => {
            let match = `${item.A} vs. ${item.B}`;
            let income = item.status == 'win' ? `+${item.credits}` : `-${item.betCredits}`;
            return (
              <div
                className="admin-bets__table-row"
                key={item.id}
                id={item.id}
              >
                <div className="admin-bets__table-item admin-bets__table-item--user">{item.user}</div>
                <div className="admin-bets__table-item admin-bets__table-item--match">{match}</div>
                <div className="admin-bets__table-item admin-bets__table-item--income">
                  <span className={item.status == 'win' ? 'message-ok' : 'message-error'}>
                    {income}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const admin = state.admin.adminBets;
  return {
    items: admin.visibleItems,
    search: admin.search
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBets: () => {
      getBets(dispatch);
    }
  }
};

AdminBets = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBets);

export default AdminBets;