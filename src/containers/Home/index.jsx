import React from 'react';
import MatchList from '../MatchList/index.jsx';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home">
        <MatchList />
      </div>
    )
  }
}

export default Home;