import React from 'react';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="admin main-box">
        <div className="admin__sidebar">
          <div className="admin__sidebar-item">Matches</div>
        </div>
        <div className="admin__body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Admin;