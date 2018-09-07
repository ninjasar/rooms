import React from 'react';
import { Link } from 'react-router-dom';

import './topBar.css';
import '../../god.css';
import Logo from './Logo.js';
import BackButton from './BackButton.js';



const AppName = (props) => {
  return (
    <div id="topBar" className="mutedPink">
      {props.url !== '/home' && props.url !== '/home/' && props.url !== '/' && props.url !== '/' && <BackButton/>}
      <div className="vertLine">
      </div>
      <div id="appNameContainer">
        <Logo/>

        <div className="appName purple">
          nyu rooms
        </div>
      </div>
        <div className="reserveContainer">
        <Link to="/home" onClick={props.setNav} className={'reserve normalCol ' + (props.newRs && ' active purple' )}>
          <div >
            Reserve New Room
          </div>
        </Link>
          <Link to="/currentReservation" onClick={props.setNav} className={'reserve normalCol ' + (props.curr && ' active purple' )}>
            <div >
               &nbsp;&nbsp;Current Reservation
            </div>
          </Link>
        </div>
        <div className="userContain normalCol">
          <div className="oval gradient"></div>
            <div className="usersName">
              {props.uName ? 'Welcome, ' + props.uName : ''}
            </div>
        </div>
    </div>
  );
};

export default AppName;
