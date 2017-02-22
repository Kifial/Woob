import React from 'react';
import { Link } from 'react-router';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="admin main-box">
        <div className="admin__sidebar">
          <Link className="admin__sidebar-item" to="/admin/matches">Matches</Link>
          <Link className="admin__sidebar-item" to="/admin/bets">Bets history</Link>
        </div>
        <div className="admin__body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Admin;