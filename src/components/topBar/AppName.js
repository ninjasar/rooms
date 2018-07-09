import React from 'react';

import './topBar.css';
import Logo from './Logo.js';
import BackButton from './BackButton.js';


const AppName = (props) => {
  return (
    <div id="topBar">
      <div id="appNameContainer">
        {props.url !== '/home' && props.url !== '/home/' && props.url !== '/' && props.url !== '/' && <BackButton/>}
        <div className="appName">
          nyu rooms
        </div>
        <div className="reserveContainer">
          <div className="reserve">
            Reserve New Room
          </div>
          <div className="reserve">
             &nbsp;&nbsp;Current Reservation
          </div>
        </div>
        <div className="usersName">
          {props.uName ? 'Welcome, ' + props.uName : ''}
        </div>
      </div>
    </div>
  );
};

export default AppName;
