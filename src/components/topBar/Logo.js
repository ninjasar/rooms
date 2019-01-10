import React from 'react';

import logo from './logoNew.svg';



const Logo = (props) => {
  return (
    <div className="logoContainer">
      <div>
        <img src={logo} alt="logo" className="logo"/>
      </div>
    </div>
  )
};

export default Logo;
