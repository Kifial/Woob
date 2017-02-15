import React from 'react';

if (typeof window != 'undefined' && window.document) require('./index.scss');

const MatchItem = (props) => {
  return (
    <div className="match-item main-box main-box--mb">
      <div className="match-item__opponent">
        <div className="match-item__opponent-name">{props.A.name}</div>
        <div className="match-item__opponent-img"></div>
        <div className="match-item__opponent-coeff">{props.A.coeff}</div>
      </div>
      <div className="match-item__versus">
        <div className="match-item__versus-box">
          <div className="match-item__versus-date">{props.date}</div>
          <div className="match-item__versus-vs">VS</div>
          <div className="match-item__versus-time">{props.time}</div>
        </div>
      </div>
      <div className="match-item__opponent">
        <div className="match-item__opponent-name">{props.B.name}</div>
        <div className="match-item__opponent-img"></div>
        <div className="match-item__opponent-coeff">{props.B.coeff}</div>
      </div>
    </div>
  )
};

export default MatchItem;