import React from 'react';

if (typeof window != 'undefined' && window.document) require('./index.scss');

const UserBetsItem = (props) => {
  let title = `${props.A} vs ${props.B}`;
  let submitClass = 'user-bets-item__submit ' +
    (props.status == 'waiting' ? 'user-bets-item__submit--hidden' : '') +
    (props.status == 'lose' ? 'user-bets-item__submit--lose' : '') +
    (props.status == 'win' ? 'user-bets-item__submit--win' : '');
  return (
    <div className="user-bets-item main-box main-box--mb">
      <div className="user-bets-item__title">{title}</div>
      <div className="user-bets-item__date-time">{props.date} | {props.time}</div>
      <div className="user-bets-item__bet">
        You bet on <strong>{props.betSide == 'A' ? props.A : props.B}</strong>, in case of win you'll earn <strong>{props.credits}</strong> credits
      </div>
      <div className="user-bets-item__status-box">
        <div className="user-bets-item__status">
          Status: <strong className="">{props.status || 'waiting'}</strong>
        </div>
        <div className={submitClass} onClick={props.handleSubmit}>Submit</div>
      </div>
    </div>
  )
};

export default UserBetsItem;