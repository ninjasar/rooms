import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import './optionsCard.css';




var OptionsCard = (props) => {
  return (
    <NavLink to={props.url} className="card">
      <div>
        <div>
          <img src={props.pic} className="cardPic" alt="pic"/>
        </div>
        <div className="cardTitle">
          {props.txt}
        </div>
        <div className="cardDescrip">
          {props.description}
        </div>
      </div>
    </NavLink>
  )
};

export default OptionsCard;
