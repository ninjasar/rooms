import React from 'react';

import './index.css';
import Logo from './Logo.js';


const AppName = (props) => (
      <div id="topBar">
        <div id="appNameContainer">
            <div>
              <Logo/>
            </div>
            <div className="appName">
              nyu rooms
            </div>
        </div>
        <div className="usersName">
          {props.uName ? "Welcome, " + props.uName : ''}
        </div>
      </div>
);

export default AppName;
