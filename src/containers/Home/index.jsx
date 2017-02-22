import React from 'react';
import MatchList from '../MatchList/index.jsx';
import HomeControls from '../HomeControls/index.jsx';
import MakeBetPopup from '../MakeBetPopup/index.jsx';

if (typeof window != 'undefined' && window.document) require('./index.scss');

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="home">
        <HomeControls />
        <MatchList />
        <MakeBetPopup />
      </div>
    )
  }
}

export default Home;