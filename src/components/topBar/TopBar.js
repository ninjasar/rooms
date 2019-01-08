import React from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';

import './topBar.css';
import '../../god.css';
import Arrows from './Arrows';
import down from './down.svg';
import up from './upIcon.svg';
import Logo from './Logo.js';
import BackButton from './BackButton.js';
import Dropdown from './Dropdown.js';


const AppName = (props) => {

  return (
    <Media query="(min-width: 1200px)" >
      {matches =>
        matches ? (
          <div id="topBar">
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
                <Dropdown></Dropdown>
                  <div className="usersName">
                    {props.uName ? 'Welcome, ' + props.uName : ''}
                  </div>
              </div>
          </div>
        ) : (
          <div id="topBar">
            <div className="medTB">
                {props.url !== '/home' && props.url !== '/home/' && props.url !== '/' && props.url !== '/' && <BackButton/>}
              <div className="logArr">
                <Logo/>
                <Arrows/>
              </div>
            </div>
          </div>
        )}
    </Media>
  );
};

export default AppName;
