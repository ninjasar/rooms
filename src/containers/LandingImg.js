import React from 'react';

import landingImg from './landingPgImg.png';
import './landing.css';



const LandingImg = (props) => {
  return (
    <div className="landingImg">
      <div>
        <img src={landingImg} alt="landing" className="landingPgImg"/>
      </div>
    </div>
  )
};

export default LandingImg;
