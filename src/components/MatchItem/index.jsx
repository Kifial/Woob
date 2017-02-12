import React from 'react';

if (typeof window != 'undefined' && window.document) require('./index.scss');

const MatchItem = (props) => {
  return (
    <div className="match-item">
      <div className="match-item__opponent">
        <div className="match-item__opponent-name">Elephant Vasya</div>
        <div className="match-item__opponent-img"></div>
        <div className="match-item__opponent-coeff">1.731</div>
      </div>
      <div className="match-item__versus">
        <div className="match-item__versus-date">22.03</div>
        <div className="match-item__versus-vs">VS</div>
        <div className="match-item__versus-time">17:00</div>
      </div>
      <div className="match-item__opponent">
        <div className="match-item__opponent-name">Turtle Senya</div>
        <div className="match-item__opponent-img"></div>
        <div className="match-item__opponent-coeff">2.342</div>
      </div>
    </div>
  )
};

export default MatchItem;