import React from 'react';
import { connect } from 'react-redux';
import { getAdminMatches, deleteMatch } from '../../actions/api';
import AdminMatchesPopup from '../AdminMatchesPopup/index.jsx';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class AdminMatches extends React.Component {
  constructor(props) {
    super(props);
    this.setMatchesPopupInfo = this.setMatchesPopupInfo.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchTimeout: ''
    };
  }
  componentDidMount() {
    this.props.getMatches();
  }
  setMatchesPopupInfo() {
    this.props.matches.forEach((item) => {
      if (item._id == this.props.selectedMatch) {
        this.props.setMatchesPopupInfo(item);
        return 0;
      }
    });
  }
  handleSearch(e) {
    this.props.handleSearch(e);
    if (this.state.searchTimeout) {
      clearTimeout(this.state.searchTimeout);
    }
    let searchTimeout = setTimeout(this.props.handleSearchResults, 200);
    this.setState({
      searchTimeout
    });
  }
  render() {
    let deleteButtonClass =
      "admin-matches__controls-item admin-matches__controls-item--delete" +
      (this.props.selectedMatch ? '' : ' admin-matches__controls-item--hidden');
    let updateButtonClass =
      "admin-matches__controls-item admin-matches__controls-item--update" +
      (this.props.selectedMatch ? '' : ' admin-matches__controls-item--hidden');
    let addButtonClass = "admin-matches__controls-item admin-matches__controls-item--add";
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
          <div className="admin-matches__buttons">
            <div
              className={deleteButtonClass}
              onClick={() => this.props.handleDeleteMatch(this.props.selectedMatch)}
            >
              Delete
            </div>
            <div className={updateButtonClass} onClick={this.setMatchesPopupInfo}>Update</div>
            <div className={addButtonClass} onClick={this.props.triggerMatchPopup}>Add</div>
          </div>
        </div>
        <div className="admin-matches__table">
          <div className="admin-matches__table-header">
            <div className="admin-matches__table-item admin-matches__table-item--title">Title</div>
            <div className="admin-matches__table-item admin-matches__table-item--date">Date</div>
            <div className="admin-matches__table-item admin-matches__table-item--time">Time</div>
          </div>
          {this.props.matches.map((item) => {
            let title = `${item.A.name}(${item.A.coeff}) vs. ${item.B.name}(${item.B.coeff})`;
            return (
              <div
                key={item._id}
                id={item._id}
                className={
                  'admin-matches__table-row ' +
                  (this.props.selectedMatch == item._id ? 'admin-matches__table-row--active' : '')
                }
                onClick={() => this.props.handleMatchClick(item._id)}
              >
                <div className="admin-matches__table-item admin-matches__table-item--title">{title}</div>
                <div className="admin-matches__table-item admin-matches__table-item--date">{item.date}</div>
                <div className="admin-matches__table-item admin-matches__table-item--time">{item.time}</div>
              </div>
            )
          })}
        </div>
        <AdminMatchesPopup />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.admin.visibleMatches,
    selectedMatch: state.admin.selectedMatch,
    search: state.admin.search
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMatches: () => {
      getAdminMatches(dispatch);
    },
    triggerMatchPopup: () => {
      dispatch({
        type: 'ADMIN_TRIGGER_MATCH_POPUP'
      })
    },
    handleMatchClick: (id) => {
      dispatch({
        type: 'ADMIN_HANDLE_MATCH_CLICK',
        id
      })
    },
    setMatchesPopupInfo: (item) => {
      dispatch({
        type: 'ADMIN_HANDLE_UPDATE_MATCH',
        data: item
      });
    },
    handleDeleteMatch: (id) => {
      deleteMatch(id, dispatch);
    },
    handleSearch: (e) => {
      dispatch({
        type: 'ADMIN_HANDLE_MATCHES_SEARCH_INPUT',
        value: e.target.value
      })
    },
    handleSearchResults: () => {
      dispatch({
        type: 'ADMIN_HANDLE_SEARCH_RESULTS'
      })
    }
  }
};

AdminMatches = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminMatches);

export default AdminMatches;