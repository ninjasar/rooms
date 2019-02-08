import React from 'react';
import Media from 'react-media';

import logo from './logoNew.svg';
import medLogo from './logoNewMed.svg';



const Logo = (props) => {
  return (
    <Media query="(max-width: 1200px)" >
      {matches =>
        matches ? (
          <div className="logoContainer">
            <div>
              <img src={medLogo} alt="medLogo" className="logo"/>
            </div>
          </div>
        ): (
          <div className="logoContainer">
            <div>
              <img src={logo} alt="logo" className="logo"/>
            </div>
          </div>
        )}
    </Media>
  )
};

export default Logo;
