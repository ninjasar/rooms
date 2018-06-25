import React from 'react';
import { BrowserRouter as  BrowserRouter, NavLink} from 'react-router-dom';

import './card.css';





const OptionsCard = (props) => (
  <NavLink to='/button' className="card">
      <div >
        <div>
          <img src={props.pic} className="cardPic" alt="pic"></img>
        </div>
        <div className="cardTitle">
          {props.txt}
        </div>
        <div className="cardDescrip">
          {props.description}
        </div>
      </div>
    </NavLink>

);

export default OptionsCard;
