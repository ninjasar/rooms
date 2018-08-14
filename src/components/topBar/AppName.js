import React from 'react';
import { Link } from 'react-router-dom';

import './topBar.css';
import Logo from './Logo.js';
import BackButton from './BackButton.js';



const AppName = (props) => {
  return (
    <div id="topBar">
      {props.url !== '/home' && props.url !== '/home/' && props.url !== '/' && props.url !== '/' && <BackButton/>}
      <div className="vertLine">
      </div>
      <div id="appNameContainer">
        <Logo/>

        <div className="appName">
          nyu rooms
        </div>
      </div>
        <div className="reserveContainer">
        <Link to="/home" onClick={props.setNav} className={'reserve ' + (props.newRs && ' active' )}>
          <div >
            Reserve New Room
          </div>
        </Link>
          <Link to="/currentReservation" onClick={props.setNav} className={'reserve ' + (props.curr && ' active' )}>
            <div >
               &nbsp;&nbsp;Current Reservation
            </div>
          </Link>
        </div>
        <div className="userContain">
          <div className="oval"></div>
            <div className="usersName">
              {props.uName ? 'Welcome, ' + props.uName : ''}
            </div>
        </div>
    </div>
  );
};

export default AppName;
